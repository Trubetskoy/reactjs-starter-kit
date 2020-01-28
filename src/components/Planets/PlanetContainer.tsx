import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changeStateProp } from "../../actions";
import { spinnerIsLoading } from "../../actions/main";
import { Planet } from "./Planet";

const mapStateToProps = ({ main: { value, isLoading } }: any) => {
  return {
    value,
    isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ changeStateProp, spinnerIsLoading }, dispatch)
  };
};

const PlanetContainer = connect(mapStateToProps, mapDispatchToProps)(Planet);

export default PlanetContainer;
