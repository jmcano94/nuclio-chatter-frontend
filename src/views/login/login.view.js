import {Heading, Input, FormControl, FormLabel, Link, Text, SlideFade, useDisclosure, Button, FormErrorMessage, InputGroup, InputRightElement, IconButton} from "@chakra-ui/react";
import {ViewOffIcon, ViewIcon} from "@chakra-ui/icons";
import {Link as ReactLink} from 'react-router-dom';
import styles from './login.module.css';
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import fetchResource from "../../api";
import {setUserSession} from "../../api/auth";
import { useHistory } from 'react-router-dom';
const Login = (props) => {
	const {isOpen, onToggle} = useDisclosure();
	const [viewPassword, setViewPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
			onToggle();
		}, 500);
	}, []);

	const { register, handleSubmit, errors, setError, clearErrors } = useForm();
	const onSubmit = data => {
		clearErrors();
		setIsSubmitting(true);
		fetchResource("POST", "login", {body: data}).then((res) => {
			setUserSession(res);
			setIsSubmitting(false);
			history.push("/");
		}).catch((error) => {
			Object.keys(error.response.error).forEach(key => {
				setError(key, {
					type: "manual",
					message: error.response.error[key]
				});
			})
			setIsSubmitting(false);
		})
	}
	return (
				<div className={styles.image}>
						<div className={styles.glass}>
							<SlideFade in={isOpen} offsetY="30px">
								<div className={styles.form}>
									<div className={styles.header}>
										<Heading as="h1" size="3xl" color="blue.700">
											Nuclio Chatter
										</Heading>
									</div>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className={styles.input}>
											<FormControl id="email" isInvalid={errors.email}>
												<FormLabel>Email</FormLabel>
												<Input name="email" type="email" ref={register({
													required: 'Enter a valid email',
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: "Invalid email address"
													}
												})} autoComplete="off" placeholder="yourawesome@email.com"/>
												<FormErrorMessage>{errors.email ? errors.email.message: ''}</FormErrorMessage>
											</FormControl>
										</div>
										<div className={styles.input}>
											<FormControl id="password" isInvalid={errors.password}>
												<FormLabel>Password</FormLabel>
												<InputGroup>
													<Input name="password" type={viewPassword ? "text": "password"} ref={register({
														required: 'You must enter a password ',
														minLength : {
															value: 6,
															message: 'Password must be at least 6 characters long'
														},
														maxLength : {
															value: 12,
															message: 'Password can not exceed 12 characters'
														},
													})} autoComplete="off" placeholder="*********"/>
													<InputRightElement width="4.5rem">
														<IconButton size={"sm"} onClick={() => setViewPassword(!viewPassword)}>
															{viewPassword ? <ViewOffIcon/> : <ViewIcon/>}
														</IconButton>
													</InputRightElement>
												</InputGroup>

												<FormErrorMessage>{errors.password ?errors.password.message: ''}</FormErrorMessage>
											</FormControl>
										</div>
										<div className={styles.button}>
											<Button
												size="md"
												height="48px"
												width="200px"
												colorScheme="blue"
												type="submit"
												isLoading={isSubmitting}
												loadingText="Submitting"
											>
												Log In
											</Button>
										</div>
									</form>
									<Text align="center" p={4}>
										Not registered yet? Click{' '}
										<Link as={ReactLink} to="/signup" color="blue.800">
											<b>here</b>
										</Link>
										{' '}to Sign Up.
									</Text>
								</div>
							</SlideFade>
						</div>
				</div>
	)
};

export default Login;
