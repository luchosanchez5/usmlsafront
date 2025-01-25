import { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import InputField from "../product/InputField";
import SelectTag from "../product/SelectTag";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTeams,
  GetTeamsbyTeamId,
  UpdateTeams,
} from "../../store/team/actions/actionsCreators";
import { GlobalInfo } from "../../App";
import { useNavigate } from "react-router-dom";
import { AllTeamSchemas } from "../../Schemas/Schemas";

function AddTeamsFields() {
  const { user } = useSelector((state) => state.user);
  const { TeamDetailsData } = useSelector((state) => state.team);
  const { TeamEdit, TeamId } = useContext(GlobalInfo);
  const Token = user?.access_token;
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    address: "",
    // points: null,
    // ranking: null,
    // division: "",
    city: "",
    state: "",
    // gamesWin: null,
    // gamesLost: null,
    // gamesTied: null,
    // avgRunsScored: null,
    // avgRunsAllowed: null,
    // avgRunsDiff: null,
    // runScored: null,
    // runAllowed: null,
    teamStatus: "",
  };

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    setValues,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AllTeamSchemas,
    onSubmit: (values, action) => {
      let data;
      if (TeamEdit) {

        data = {
          name: values.name,
          email: values.email,
          address: values.address,
          // points: values.points,
          // ranking: values.ranking,
          // division: values.division,
          city: values.city,
          state: values.state,
          // gamesWin: values.gamesWin,
          // gamesLost: values.gamesLost,
          // gamesTied: values.gamesTied,
          // avgRunsScored: values.avgRunsScored,
          // avgRunsAllowed: values.avgRunsAllowed,
          // avgRunsDiff: values.avgRunsDiff,
          // runScored: values.runScored,
          // runAllowed: values.runAllowed,
          teamStatus: "ACTIVE",
          managerId: TeamDetailsData.managerId,
        };
        Dispatch(UpdateTeams(TeamId, data, Token, Navigate));
      } else {
        data = {
          name: values.name,
          email: values.email,
          address: values.address,
          // points: values.points,
          // ranking: values.ranking,
          // division: values.division,
          city: values.city,
          state: values.state,
          // gamesWin: values.gamesWin,
          // gamesLost: values.gamesLost,
          // gamesTied: values.gamesTied,
          // avgRunsScored: values.avgRunsScored,
          // avgRunsAllowed: values.avgRunsAllowed,
          // avgRunsDiff: values.avgRunsDiff,
          // runScored: values.runScored,
          // runAllowed: values.runAllowed,
          teamStatus: "ACTIVE",
        };
        Dispatch(AddTeams(data, Token, Navigate));
      }
      action.resetForm();
    },
  });

  const teamStatusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
    { value: "DISBANDED", label: "DISBANDED" },
  ];

  useEffect(() => {
    if (TeamEdit && TeamDetailsData) {
      Dispatch(GetTeamsbyTeamId(TeamId, Token));
    }
  }, [TeamEdit, Dispatch]);

  useEffect(() => {
    if (TeamEdit && TeamDetailsData) {
      setValues({
        name: TeamDetailsData.name || "",
        email: TeamDetailsData.email || "",
        address: TeamDetailsData.address || "",
        points: TeamDetailsData.points || "",
        ranking: TeamDetailsData.ranking || "",
        division: TeamDetailsData.division || 0,
        city: TeamDetailsData.city || "",
        state: TeamDetailsData.state || "",
        gamesWin: TeamDetailsData.gamesWin || "",
        gamesLost: TeamDetailsData.gamesLost || "",
        gamesTied: TeamDetailsData.gamesTied || "",
        avgRunsScored: TeamDetailsData.avgRunsScored || "",
        avgRunsAllowed: TeamDetailsData.avgRunsAllowed || "",
        avgRunsDiff: TeamDetailsData.avgRunsDiff || "",
        runScored: TeamDetailsData.runScored || "",
        runAllowed: TeamDetailsData.runAllowed || "",
        teamStatus: TeamDetailsData.teamStatus || "",
      });
    }
  }, [TeamDetailsData, TeamEdit, setValues]);

  return (
    <div className="mt-3">
      <h4 className="mb-3 fw-bold">{TeamEdit ? "Update Team" : "Add Team"}</h4>
      <form onSubmit={handleSubmit}>
        <Row className="gy-3">
          <Col md={4}>
            <InputField
              type="text"
              name="name"
              label="Team Name"
              onChange={handleChange}
              value={values.name}
              className="form-control"
              touched={touched.name}
              error={errors.name}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="email"
              name="email"
              label="Email"
              onChange={handleChange}
              value={values.email}
              className="form-control"
              touched={touched.email}
              error={errors.email}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="text"
              name="address"
              label="Address"
              onChange={handleChange}
              value={values.address}
              className="form-control"
              touched={touched.address}
              error={errors.address}
            />
          </Col>
          {/* <Col md={4}>
            <InputField
              type="number"
              name="points"
              label="Team Points"
              onChange={handleChange}
              value={values.points}
              className="form-control"
              touched={touched.points}
              error={errors.points}
            />
          </Col> */}
          {/* <Col md={4}>
            <InputField
              type="number"
              name="ranking"
              label="Team Ranking"
              onChange={handleChange}
              value={values.ranking}
              className="form-control"
              touched={touched.ranking}
              error={errors.ranking}
            />
          </Col> */}
          {/* <Col md={4}>
            <InputField
              type="text"
              name="division"
              label="Team Division"
              onChange={handleChange}
              value={values.division}
              className="form-control"
              touched={touched.division}
              error={errors.division}
            />
          </Col> */}
          <Col md={4}>
            <InputField
              type="text"
              name="city"
              label="City"
              onChange={handleChange}
              value={values.city}
              className="form-control"
              touched={touched.city}
              error={errors.city}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="text"
              name="state"
              label="State"
              onChange={handleChange}
              value={values.state}
              className="form-control"
              touched={touched.state}
              error={errors.state}
            />
          </Col>
          {/* <Col md={4}>
            <InputField
              type="number"
              name="gamesWin"
              label="Games Win"
              onChange={handleChange}
              value={values.gamesWin}
              className="form-control"
              touched={touched.gamesWin}
              error={errors.gamesWin}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="gamesLost"
              label="Games Lost"
              onChange={handleChange}
              value={values.gamesLost}
              className="form-control"
              touched={touched.gamesLost}
              error={errors.gamesLost}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="gamesTied"
              label="Games Tied"
              onChange={handleChange}
              value={values.gamesTied}
              className="form-control"
              touched={touched.gamesTied}
              error={errors.gamesTied}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="avgRunsScored"
              label="Avg Runs Scored"
              onChange={handleChange}
              value={values.avgRunsScored}
              className="form-control"
              touched={touched.avgRunsScored}
              error={errors.avgRunsScored}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="avgRunsAllowed"
              label="Avg Runs Allowed"
              onChange={handleChange}
              value={values.avgRunsAllowed}
              className="form-control"
              touched={touched.avgRunsAllowed}
              error={errors.avgRunsAllowed}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="avgRunsDiff"
              label="Avg Runs Diff"
              onChange={handleChange}
              value={values.avgRunsDiff}
              className="form-control"
              touched={touched.avgRunsDiff}
              error={errors.avgRunsDiff}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="runScored"
              label="Run Scored"
              onChange={handleChange}
              value={values.runScored}
              className="form-control"
              touched={touched.runScored}
              error={errors.runScored}
            />
          </Col>
          <Col md={4}>
            <InputField
              type="number"
              name="runAllowed"
              label="Run Allowed"
              onChange={handleChange}
              value={values.runAllowed}
              className="form-control"
              touched={touched.runAllowed}
              error={errors.runAllowed}
            />
          </Col> */}
          {/* <Col md={4}>
            <SelectTag
              options={teamStatusOptions}
              deFaultValue="ACTIVE"
              onChange={handleChange}
              label="Team Status"
              name="teamStatus"
              touched={touched.teamStatus}
              error={errors.teamStatus}
              value={values.teamStatus}
              className="form-control"
            />
          </Col> */}
        </Row>
        <div className="d-flex justify-content-center">
          <button type="submit" className="mt-3 gradient-btn-orange">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamsFields;
