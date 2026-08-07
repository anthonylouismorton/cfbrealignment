// Derives which schools/states should glow for the current year's conference
// changes, keyed off the same `conferenceChanges` array the History panel reads.
export function getGlowChanges(conferenceChanges) {
  const glowBySchool = new Map();
  const glowByState = new Map();

  (conferenceChanges || []).forEach((change) => {
    let color = null;
    if (change.change === 'joined' || change.change === 'rejoined') {
      color = change.mapColor;
    } else if (change.change === 'left') {
      color = change.newConferenceColor;
    }

    if (!color || !change.school) return;

    glowBySchool.set(change.school, color);
    if (change.stateId && !glowByState.has(change.stateId)) {
      glowByState.set(change.stateId, color);
    }
  });

  return { glowBySchool, glowByState };
}
