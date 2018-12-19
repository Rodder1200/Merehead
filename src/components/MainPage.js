import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchUsers, setPage } from "../actions/userActions";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    marginTop: theme.spacing.unit * 2,
    width: "90%",
    maxWidth: "1200px",
    minWidth: "500px"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class MainPage extends Component {
  state = {
    rowsPerPage: 5
  };

  componentWillMount() {
    this.props.setPage();
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, classes, page, setPage, error } = this.props;
    const { rowsPerPage } = this.state;
    console.log(this.props);

    const userItems = users.map((user, index) =>
      index < rowsPerPage * (page + 1) && index + 1 > rowsPerPage * page ? (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.surname}</TableCell>
          <TableCell>{user.desc}</TableCell>
        </TableRow>
      ) : null
    );
    const preLoader = error ? (
      <div>
        <h1>ERROR</h1>
        <p>{error}</p>
      </div>
    ) : (
      <div>
        <CircularProgress className={classes.progress} />
        Loading ...
      </div>
    );

    return (
      <Paper className={classes.paper}>
        {userItems.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{userItems}</TableBody>
          </Table>
        ) : (
          preLoader
        )}
        <TablePagination
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          page={page}
          onChangePage={(event, page) => {
            setPage(page);
          }}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userState.users,
    page: state.userState.page,
    error: state.userState.error
  };
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { fetchUsers, setPage }
  )
)(MainPage);
