// Derives app/data/schoolHistory.json from app/data/updatedConferenceData.json.
//
// A school's full conference history is scattered across every conference
// entry it ever belonged to (each conference lists its own schools with
// their own `years`/`left`/`rejoined` records). This walks all of that and
// compiles one flat, chronological timeline per school, keyed by school name
// (the same identifier already used as the React key elsewhere in the app).
//
// Re-run this whenever updatedConferenceData.json changes:
//   node scripts/generateSchoolHistory.js

const fs = require('fs');
const path = require('path');

const SOURCE_PATH = path.join(__dirname, '../app/data/updatedConferenceData.json');
const OUTPUT_PATH = path.join(__dirname, '../app/data/schoolHistory.json');

const conferenceData = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));

// A single conference entry's `years` list can itself have a gap (a school
// that briefly left and rejoined the SAME conference), so split each
// entry's years into contiguous runs -- each run is its own stint.
function splitIntoStints(years, conferenceAbbr) {
  const sorted = [...years].sort((a, b) => a - b);
  const stints = [];
  let runStart = sorted[0];
  let runEnd = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === runEnd + 1) {
      runEnd = sorted[i];
    } else {
      stints.push({ conference: conferenceAbbr, startYear: runStart, endYear: runEnd });
      runStart = sorted[i];
      runEnd = sorted[i];
    }
  }
  stints.push({ conference: conferenceAbbr, startYear: runStart, endYear: runEnd });
  return stints;
}

const schools = new Map();

conferenceData.forEach((conference) => {
  if (!conference.schools) return;

  conference.schools.forEach((school) => {
    if (!school.years || school.years.length === 0) return;

    if (!schools.has(school.school)) {
      schools.set(school.school, {
        school: school.school,
        abbreviation: school.abbreviation ?? null,
        nickName: school.nickName ?? null,
        stateId: school.stateId ?? null,
        logo: school.logo ?? null,
        lon: school.lon ?? null,
        lat: school.lat ?? null,
        conferenceHistory: [],
      });
    }

    const entry = schools.get(school.school);
    entry.conferenceHistory.push(...splitIntoStints(school.years, conference.abbreviation));
  });
});

const result = {};
[...schools.values()]
  .sort((a, b) => a.school.localeCompare(b.school))
  .forEach(({ school, ...rest }) => {
    rest.conferenceHistory.sort((a, b) => a.startYear - b.startYear);
    result[school] = rest;
  });

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + '\n');
console.log(`Wrote ${Object.keys(result).length} schools to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
