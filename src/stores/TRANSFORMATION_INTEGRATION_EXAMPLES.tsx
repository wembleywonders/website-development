// ===================================
// USAGE SUMMARY
// ===================================

/*

TRANSFORMATION STORE ACTIONS:
- recordProblemIdentified() - User describes their problem (Stage 1)
- recordSolutionDesign() - User starts building (Stage 2)
- recordIgnitionMoment() - Capture the decision moment
- recordSolutionDeployment() - Solution goes live (Stage 3)
- recordMentoringStart() - User starts teaching others (Stage 4)
- advanceStage() - Move between stages
- trackMilestone() - Log achievements
- getStageInsights() - Get recommendations

JOURNAL STORE ACTIONS:
- addEntry() - Create new journal entry
- getEntriesByStage() - Retrieve stage-specific entries
- getJournalStats() - Get writing stats
- exportJournal() - Export as markdown/JSON
- shareEntryWith() - Share with mentors/ROVs

INTEGRATION PATTERNS:
1. Maya guides Stage 1→2 transition (ignition moment)
2. Specialist ROVs track stage-specific milestones
3. Dashboard displays progress
4. Journal captures reflections
5. System learns from patterns
6. Evidence portfolio exportable

*/
