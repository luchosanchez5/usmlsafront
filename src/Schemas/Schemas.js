import * as Yup from "yup";

export const AllTeamSchemas = Yup.object({
  name: Yup.string().required("Team Name is Required"),
  email: Yup.string().email().required("Email  is Required"),
  address: Yup.string().required("Address is Required"),
  city: Yup.string().required("City is Required"),
  state: Yup.string().required("State is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
});

export const AllTournamentSchemas = Yup.object({
  name: Yup.string().required("TeamName is Required"),
  startDate: Yup.date().required("Start Date is Required"),
  endDate: Yup.date().required("End Date is Required"),
  tournamentStatus: Yup.string().required("Tournament Status is Required"),
  numberOfDivisions: Yup.number().typeError("No Of Division must be a valid number")
    .required("Number Of Divisions is Required"),
});
export const AllVenueSchemas = Yup.object({
  name: Yup.string().required("Venue Name is Required"),
  address1: Yup.string().required("Address1 is Required"),
  city: Yup.string().required("City is Required"),
  state: Yup.string().required("State is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
  numberOfFields: Yup.number().required("Number of Fields is Required"),
  venueStatus: Yup.string().required("Venue Status is Required"),
});

export const AdminValuesSchemas = Yup.object({
  email: Yup.string().email().required("Email is Required"),
  firstName: Yup.string().required("first Name is Required"),
  lastName: Yup.string().required("last Name is Required"),
});

export const ManagerUpdateValuesSchemas = Yup.object({
  email: Yup.string().email().required("Email is Required"),
  firstName: Yup.string().required("first Name is Required"),
  lastName: Yup.string().required("last Name is Required"),
  mobilePhone: Yup.string().required("Mobile Phone is Required"),
});

export const AllDivisionSchemas = Yup.object({
  divisionName: Yup.string().required("Division Name is Required"),

  entryFee: Yup.number()
    .typeError("Entry Fee must be a valid number")
    .required("Entry Fee is Required")
    .test("is-greater", "Entry Fee must be greater than Initial Deposit Fee", function (value) {
      return value > this.parent.initialDepositFee;
    }),
  initialDepositFee: Yup.number()
    .typeError("Initial Deposit Fee must be a valid number")
    .required("Initial Deposit Fee is Required"),
  divisionStatus: Yup.string().required("Division Status is Required"),
  maxTeams: Yup.number()
    .min(1, "Max Teams must be at least 1")
    .typeError("Max Teams must be a valid number")
    .required("Max Teams is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  prize1: Yup.string().typeError("Prize 1 must be a valid value").required("Prize 1 is Required"),
  prize2: Yup.string().typeError("Prize 1 must be a valid value").nullable(),
  prize3: Yup.string().typeError("Prize 1 must be a valid value").nullable(),
  prize4: Yup.string().typeError("Prize 1 must be a valid value").nullable(),
  tournamentId: Yup.number()
    .typeError("Please Select Tournament")
    .required("Tournament is Required"),
});


export const AllUsersSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  role: Yup.string().required("Role is Required"),
  email: Yup.string().email().required("Email is Required"),
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name  is Required"),
  password: Yup.string().required("Password  is Required"),
  address1: Yup.string().required("Address1 is Required"),
  division: Yup.string().required("Division is Required"),
  points: Yup.number().nullable().required("Points is Required"),
  ranking: Yup.number().nullable().required("Ranking is Required"),
  city: Yup.string().required("City is Required"),
  state: Yup.string().required("State is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
  tournamentsPlayed: Yup.number()
    .nullable()
    .required("Tournaments Played is Required"),
  playerStatus: Yup.string().required("Player Status is Required"),
  gamesPlayed: Yup.number().nullable().required("Games Played is Required"),
  mobilePhone: Yup.string().required("Mobile Phone is Required"),
});

export const ProviderRegisterSchemas = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name  is Required"),
  email: Yup.string().email().required("Email is Required"),
  address1: Yup.string().required("Address 1 is Required"),
  city: Yup.string().required("City is Required"),
  state: Yup.string().required("State is Required"),
  zipCode: Yup.string().required("Zip Code is Required"),
  mobilePhone: Yup.string()
    .required("Mobile Phone is Required")
    .matches(
      /^[+]?[0-9\s-]+$/,
      "Invalid mobile phone format. Only numbers, spaces, '+' or '-' are allowed."
    ),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  role: Yup.string().required("Role is required"),
});
export const ForgetPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email is Required"),
});

export const AddPersonSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobilePhone: Yup.string().required("Mobile Phone is required"),
  driverLicenseId: Yup.string().required("Driver License Id is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
});
