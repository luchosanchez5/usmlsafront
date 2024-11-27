import * as Yup from "yup";

export const AllTeamSchemas = Yup.object({
    name: Yup.string().required("Team Name is Required"),
    email: Yup.string().email().required("Email  is Required"),
    address: Yup.string().required("Address is Required"),
    points: Yup.string().required("Points is Required"),
    ranking: Yup.string().required("Ranking is Required"),
    division: Yup.string().required("Division is Required"),
    city: Yup.string().required("City is Required"),
    state: Yup.string().required("State is Required"),
    gamesWin: Yup.number().required("Games Win is Required"),
    gamesLost: Yup.number().required("Games Lost is Required"),
    gamesTied: Yup.number().required("Games Tied is Required"),
    avgRunsScored: Yup.number().required("Avg Runs Scored is Required"),
    avgRunsAllowed: Yup.number().required("Avg Runs Allowed is Required"),
    avgRunsDiff: Yup.number().required("Avg Runs Diff is Required"),
    runScored: Yup.number().required("Run Scored is Required"),
    runAllowed: Yup.number().required("Run Allowed is Required"),
    teamStatus: Yup.string().required("Team Status is Required")
});

export const AllTournamentSchemas = Yup.object({
    name: Yup.string().required("TeamName is Required"),
    startDate: Yup.date().required("Start Date is Required"),
    endDate: Yup.date().required("End Date is Required").test(
        "is-greater",
        "End date must be greater than start date.",
        function (value) {
            const { startDate } = this.parent;
            return value && startDate && new Date(value) > new Date(startDate)
        }
    ),
    tournamentStatus: Yup.string().required("Tournament Status is Required"),
    numberOfDivisions: Yup.number().required('Number Of Divisions is Required'),
});
export const AllVenueSchemas = Yup.object({
    name: Yup.string().required("Venue Name is Required"),
    address1: Yup.string().required("Address1 is Required"),
    address2: Yup.string().required("Address2 is Required"),
    city: Yup.string().required("City is Required"),
    state: Yup.string().required('State is Required'),
    numberOfFields: Yup.number().required('Number of Fields is Required'),
    venueStatus: Yup.string().required('Venue Status is Required'),

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
});


export const AllDivisionSchemas = Yup.object({
    divisionName: Yup.string().required("Division Name is Required"),

    entryFee: Yup.number().required('Entry Fee is Required'),
    initialDepositFee: Yup.number().required('Initial Deposit Fee is Required'),
    divisionStatus: Yup.string().required('Division Status is Required'),
    maxTeams: Yup.number().required('Max Teams is Required'),
    startTime: Yup.string().required('Start Time is Required'),
    prize1: Yup.number().required('Prize1 is Required'),
    prize2: Yup.number().required('Prize2  is Required'),
    prize3: Yup.number().required('Prize3 is Required'),
    prize4: Yup.number().required('Prize4  is Required'),
    tournamentId: Yup.number().required('Tournament is Required'),

});

export const AllUsersSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    role: Yup.string().required("Role is Required"),
    email: Yup.string().email().required("Email is Required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name  is Required"),
    password: Yup.string().required("Password  is Required"),
    address1: Yup.string().required("Address1 is Required"),
    address2: Yup.string().required("Address2 is Required"),
    division: Yup.string().required("Division is Required"),
    points: Yup.number().nullable().required("Points is Required"),
    ranking: Yup.number().nullable().required("Ranking is Required"),
    city: Yup.string().required("City is Required"),
    state: Yup.string().required("State is Required"),
    zipCode: Yup.string().required("Zip Code is Required"),
    tournamentsPlayed: Yup.number().nullable().required("Tournaments Played is Required"),
    playerStatus: Yup.string().required("Player Status is Required"),
    gamesPlayed: Yup.number().nullable().required("Games Played is Required"),
    mobilePhone: Yup.string().required("Mobile Phone is Required"),
});

export const ProviderRegisterSchemas = Yup.object({
    name: Yup.string().required("name is Required"),
    lastName: Yup.string().required("lastName  is Required"),
    firstName: Yup.string().required("firstName  is Required"),
    email: Yup.string().email().required("email is Required"),
    address1: Yup.string().required("address1 is Required"),
    address2: Yup.string().required("address2 is Required"),
    city: Yup.string().required("city is Required"),
    state: Yup.string().required("state is Required"),
    zipCode: Yup.string().required("zipCode is Required"),
    mobilePhone: Yup.string()
        .required("mobilePhone is Required")
        .matches(
            /^[+]?[0-9\s-]+$/,
            "Invalid mobile phone format. Only numbers, spaces, '+' or '-' are allowed."
        ),
    password: Yup.string().required("Password is Required"),
    role: Yup.string().required("Role is required"),

});
export const ForgetPasswordSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
})



export const AddPersonSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Name is required'),
    role: Yup.string().required('Role is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().required('Address 2 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    mobilePhone: Yup.string().required('Mobile Phone is required'),
    playerStatus: Yup.string().required('Player Status is required'),
    tournamentsPlayed: Yup.number().when('role', {
        is: 'PLAYER',
        then: Yup.number().required('Tournaments Played is required'),
        otherwise: Yup.number().nullable(),
    }),
    points: Yup.number().when('role', {
        is: 'PLAYER',
        then: Yup.number().required('Points are required'),
        otherwise: Yup.number().nullable(),
    }),
    ranking: Yup.number().when('role', {
        is: 'PLAYER',
        then: Yup.number().required('Ranking is required'),
        otherwise: Yup.number().nullable(),
    }),
    gamesPlayed: Yup.number().when('role', {
        is: 'PLAYER',
        then: Yup.number().required('Games Played is required'),
        otherwise: Yup.number().nullable(),
    }),

});
