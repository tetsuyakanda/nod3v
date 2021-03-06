import {
  Grid,
  Link as MULink,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { nod4jActions } from 'app/actions';
import { ContentContainer } from 'app/components/atoms/contentContainer';
import { ProjectInfo } from 'app/models/api';
import { RootState } from 'app/reducers';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Set Style for App Top Page.
 */
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2)
  }
}));

/**
 * This function returns the message of the top page, andthe github link of this project and Authors.
 */
function MainPanel() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Welcome to nod4j
      </Typography>
      <Typography component="p" color="textSecondary">
        Source code is availabe on{' '}
        <MULink href="https://github.com/k-shimari/nod4j" target="_blank">
          GitHub
        </MULink>
        .
      </Typography>
      <Typography component="p" color="textSecondary">
        Author:{' '}
        <MULink href="https://github.com/k-shimari" target="_blank">
          k-shimari
        </MULink>{' '}
        <MULink href="https://github.com/maxfie1d" target="_blank">
          maxfie1d
        </MULink>
      </Typography>
    </Paper>
  );
}

/**
 * This function returns the project which links to the FileTable window.
 */
function ProjectListItem(props: ProjectInfo) {
  const { name } = props;
  return (
    <ListItem button component="a" href={`project/${name}/files`}>
      <ListItemText primary={name} primaryTypographyProps={{ color: 'primary' }} />
    </ListItem>
  );
}

/**
 * This function returns the sets of the links to the project fileTable.
 */
function OpenProjectPanel() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(nod4jActions.requestProjects());
  }, []);
  const projects = useSelector((state: RootState) => state.nod4j.projects);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Open project
      </Typography>
      <div>
        <List dense>
          {projects
            ? projects.map((item, index) => <ProjectListItem key={index} {...item} />)
            : null}
        </List>
      </div>
    </Paper>
  );
}

/**
 * This function returns the OpenProjectPanel component and DebugPanel Component.
 */
export function App() {
  return (
    <ContentContainer>
      <MainPanel />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <OpenProjectPanel />
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
