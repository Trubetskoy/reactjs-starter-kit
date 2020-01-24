import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changeStateProp } from "../../actions";
import { SingleStarship } from "./SingleStarship";

const mapStateToProps = ({ main: { value } }: any) => {
  return {
    value
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ changeStateProp }, dispatch),
  };
};

const StarshipsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStarship);

export default StarshipsContainer;
