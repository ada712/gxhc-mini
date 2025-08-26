import modules from "./modules";
import getters from "./getters";

import { createStore } from 'vuex'
const store = createStore({
	modules,
	getters
})

export default store