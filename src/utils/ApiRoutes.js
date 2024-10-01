export const HOST = "https://chathubserver-cgut.onrender.com";

const authRoute = `${HOST}/api/auth`;
const userRoute = `${HOST}/api/user`;
const messageRoute = `${HOST}/api/message`;

export const CHECK_USER_ROUTE = `${authRoute}/check-user`;
export const ON_BOARD_USER = `${authRoute}/on-board`;
export const GET_ALL_CONTACTS = `${userRoute}/getContacts`;

export const SEND_MESSAGE = `${messageRoute}/add-message`;
export const GET_MESSAGE = `${messageRoute}/getAllMessage`;

export const ADD_IMAGE_MESSAGE = `${messageRoute}/add-image-message`;

export const ADD_AUDIO_MESSAGE = `${messageRoute}/add-audio-message`;

export const GET_INITIAL_CONTACTS = `${messageRoute}/get-all-initial-contacts`;

export const SEND_TO_GEMINI_MESSAGE = `${messageRoute}/sendGeminiMessage`;

export const GET_ALL_GEMINI_MESSAGE = `${messageRoute}/getAllGeminiMessage`;
