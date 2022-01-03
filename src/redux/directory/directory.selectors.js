import { createSelector } from 'reselect';

const selectDiretory = state => state.directory;

const selectDirectorySections = createSelector(
	[selectDiretory],
	directory => directory.sections
);

export default selectDirectorySections;
