import { connect } from "react-redux";
import Header from "../components/Header";
import { addTodo, undo, redo } from "../actions";

const mapStateToProps = (state) => ({
  currentActionIndex: state.todos.currentIndex,
  historyListLastIndex: state.todos.historyList.length - 1,
});
export default connect(mapStateToProps, { addTodo, undo, redo })(Header);
