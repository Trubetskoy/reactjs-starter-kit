import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changeStateProp } from "../../actions";
import { spinnerStartLoading, spinnerEndLoading } from "../../actions/main";
import { Starships } from "./Starships";

const mapStateToProps = ({ main: { value, isLoading } }: any) => {
  return {
    value,
    isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      { changeStateProp, spinnerStartLoading, spinnerEndLoading },
      dispatch
    )
  };
};

const StarshipsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Starships);

export default StarshipsContainer;
