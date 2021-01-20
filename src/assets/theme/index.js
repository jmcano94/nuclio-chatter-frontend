import { extendTheme } from "@chakra-ui/react";
import {Input} from "./input";
import {Button} from "./button";


const theme = extendTheme({
	colors:{
		transparent: "transparent",
	},
	fonts: {
		body: "Raleway, sans-serif"
	},
	components: {
		Input,
		Button,
	}
});

export default theme;
