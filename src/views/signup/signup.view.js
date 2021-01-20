import {
	Heading,
	Input,
	FormControl,
	FormLabel,
	Link,
	Text,
	SlideFade,
	useDisclosure,
	FormErrorMessage, InputGroup, InputRightElement, IconButton, Button
} from "@chakra-ui/react";
import {useEffect, useState} from 'react';
import {Link as ReactLink, useHistory} from 'react-router-dom';
import styles from './signup.module.css';
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import fetchResource from "../../api";
import {setUserSession} from "../../api/auth";

const Signup = (props) => {
	const {isOpen, onToggle} = useDisclosure();
	const [viewPassword, setViewPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
			onToggle();
		}, 500);
	}, []);

	const { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
	const onSubmit = data => {
		clearErrors();
		setIsSubmitting(true);
		fetchResource("POST", "register", {body: {email: data.email, name: data.name, password: data.password}}).then((res) => {
			setUserSession(res);
			setIsSubmitting(false);
			history.push("/");
		}).catch((error) => {
			console.log(error);
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
								<Heading as="h1">
									Sign up to
								</Heading>
								<Heading as="h1" size="3xl" color="blue.700">
									Nuclio Chatter
								</Heading>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={styles.input}>
									<FormControl id="name" isInvalid={errors.email}>
										<FormLabel>Name</FormLabel>
										<Input name="name" type="text" ref={register({
											required: 'Enter your name',
										})}  placeholder="John Doe"/>
										<FormErrorMessage>{errors.name ? errors.name.message: ''}</FormErrorMessage>
									</FormControl>
								</div>
								<div className={styles.input}>
									<FormControl id="email" isInvalid={errors.email}>
										<FormLabel>Email</FormLabel>
										<Input name="email" type="email" ref={register({
											required: 'Enter a valid email',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "invalid email address"
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
								<div className={styles.input}>
									<FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
										<FormLabel>Confirm Password</FormLabel>
										<Input name="confirmPassword" type={viewPassword ? "text": "password"} ref={register({
											required: 'Passwords do not match',
											validate: (value) => value === watch('password') || "Passwords don't match."

										})} autoComplete="off" placeholder="*********"/>
										<FormErrorMessage>{errors.confirmPassword ?errors.confirmPassword.message: ''}</FormErrorMessage>
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
										Sign Up
									</Button>
								</div>
							</form>
							<Text align="center" p={4}>
								Already a user? Click{' '}
								<Link as={ReactLink} to="/login" color="blue.800">
									<b>
										here
									</b>
								</Link>
								{' '}to Log In.
							</Text>
						</div>
					</SlideFade>
				</div>
		</div>
	)
};

export default Signup;
