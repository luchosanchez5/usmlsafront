import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import InputField from "../product/InputField";
import { AllTournamentSchemas } from "../../Schemas/Schemas";
import { useDispatch } from "react-redux";
import {
  Add_Tournaments,
  GetTournamentsDetailsByTournamentId,
  UpdateTournaments,
} from "../../store/tournament/actions/actionsCreators";
import { useSelector } from "react-redux";
import SelectTag from "../product/SelectTag";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalInfo } from "../../App";
import SpinNer from "../LoadingSpinner/SpinNer";
const AddTournamentFields = () => {
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { TournamentDetails } = useSelector((state) => state.tournament);
  const { VenueData, isLoading } = useSelector((state) => state.venue);
  const { TournamentEdit, TournamentId } = useContext(GlobalInfo);
  const Navigate = useNavigate();
  const Token = user?.access_token;
  const initialValues = {
    name: "",
    startDate: "",
    endDate: "",
    tournamentStatus: "",
    numberOfDivisions: null,
    venueId: null,
    whoIsComing: false,
    showRegisteredTeams: false,
  };
  const tournamentStatusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "COMPLETED", label: "COMPLETED" },
    { value: "CANCELED", label: "CANCELED" },
  ];
  const VenueStatusOptions =
    VenueData && VenueData?.data?.length > 0
      ? VenueData?.data?.map((item) => ({
          value: item?.venueId,
          label: item?.name,
        }))
      : [];
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    setValues,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AllTournamentSchemas,
    onSubmit: (values, action) => {
      let data;
      if (values.venueId === "") {
        data = {
          name: values.name,
          startDate: values.startDate,
          endDate: values.endDate,
          tournamentStatus: values.tournamentStatus,
          numberOfDivisions: values.numberOfDivisions,
          showWhoIsComing: values.whoIsComing,
          showNumberOfRegisteredTeams: values.showRegisteredTeams,
        };
      } else {
        data = {
          name: values.name,
          startDate: values.startDate,
          endDate: values.endDate,
          tournamentStatus: values.tournamentStatus,
          numberOfDivisions: values.numberOfDivisions,
          venueId: Number(values.venueId),
          showWhoIsComing: values.whoIsComing,
          showNumberOfRegisteredTeams: values.showRegisteredTeams,
        };
      }

      if (TournamentEdit) {
        Dispatch(UpdateTournaments(TournamentId, data, Token, Navigate));
      } else {
        Dispatch(Add_Tournaments(data, Token, Navigate));
      }
      action.resetForm();
    },
  });

  useEffect(() => {
    if (TournamentEdit && TournamentDetails) {
      Dispatch(GetTournamentsDetailsByTournamentId(TournamentId, Token));
    }
  }, [TournamentEdit, Dispatch, Token, TournamentId]);
  useEffect(() => {
    if (TournamentEdit && TournamentDetails) {
      setValues({
        name: TournamentDetails.name || "",
        startDate: TournamentDetails.startDate || "",
        endDate: TournamentDetails.endDate || "",
        tournamentStatus: TournamentDetails.status || "",
        numberOfDivisions: TournamentDetails.numberOfDivisions || "",
        whoIsComing: TournamentDetails.whoIsComing,
        showRegisteredTeams: TournamentDetails.showRegisteredTeams,
      });
    }
  }, [TournamentDetails, TournamentEdit, setValues]);

  return (
    <>
      <h4 className="my-3 fw-bold">
        {TournamentEdit ? "Update Tournament" : "Add Tournament"}
      </h4>
      <form onSubmit={handleSubmit}>
        <Row className="row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
          <div className="d-flex flex-column flex-grow-1">
            <InputField
              type="text"
              name="name"
              label="Tournament Name"
              onChange={handleChange}
              value={values.name}
              className="form-control"
              touched={touched.name}
              error={errors.name}
            />
          </div>

          <div className="d-flex flex-column flex-grow-1">
            <InputField
              type="date"
              name="startDate"
              label="Start Date"
              onChange={handleChange}
              value={values.startDate}
              className="form-control"
              touched={touched.startDate}
              error={errors.startDate}
            />
          </div>

          <div className="d-flex flex-column flex-grow-1">
            <InputField
              type="date"
              name="endDate"
              label="End Date"
              onChange={handleChange}
              value={values.endDate}
              className="form-control"
              touched={touched.endDate}
              error={errors.endDate}
            />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <SelectTag
              options={tournamentStatusOptions}
              onChange={handleChange}
              deFaultValue="Select Status"
              label="Status"
              name="tournamentStatus"
              touched={touched.tournamentStatus}
              error={errors.tournamentStatus}
              value={values.tournamentStatus}
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <InputField
              type="number"
              name="numberOfDivisions"
              label="Number Of Divisions"
              onChange={handleChange}
              value={values.numberOfDivisions}
              className="form-control"
              touched={touched.numberOfDivisions}
              error={errors.numberOfDivisions}
            />
          </div>
          <div className="d-flex flex-column  flex-grow-1">
            <SelectTag
              deFaultValue="Select Venue"
              label="Select Venue *"
              name="venueId"
              options={VenueStatusOptions}
              value={values.venueId}
              onChange={handleChange}
              touched={touched.venueId}
              error={errors.venueId}
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="whoIsComingSwitch"
                name="whoIsComing"
                checked={values.whoIsComing}
                onChange={() =>
                  setFieldValue("whoIsComing", !values.whoIsComing)
                }
              />
              <label className="form-check-label" htmlFor="whoIsComingSwitch">
                Who's Coming
              </label>
            </div>
          </div>

          <div className="d-flex flex-column flex-grow-1">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="showRegisteredTeamsSwitch"
                name="showRegisteredTeams"
                checked={values.showRegisteredTeams}
                onChange={() =>
                  setFieldValue(
                    "showRegisteredTeams",
                    !values.showRegisteredTeams
                  )
                }
              />
              <label
                className="form-check-label"
                htmlFor="showRegisteredTeamsSwitch"
              >
                Show Registered Teams
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-grow-1 ">
            <button type="submit" className="mt-3 gradient-btn-orange rounded">
              {isLoading ? <SpinNer /> : "Submit"}
            </button>
          </div>
        </Row>
      </form>
    </>
  );
};

export default AddTournamentFields;
