import { Heading, Text, Button, Link, View, CheckboxField, Flex, Authenticator, Image, useTheme, useAuthenticator, TextField } from '@aws-amplify/ui-react';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const NiChartAuthenticator = props => {



    function TermsAndConditionsModal() {
        return (
            <Heading level={1}>Placeholder for T&C!</Heading>
        )
    }

    return (
        <Authenticator //{...props}
          // Default to Sign Up screen
          initialState="signIn"
          // Customize `Authenticator.SignUp.FormFields`
          components={{

            Header() {
                const { tokens } = useTheme();
            
                return (
                  <View textAlign="center" padding={tokens.space.large}>
                  
                    <Flex direction="row">
                    <Image
                      alt="NiChart Logo"
                      src="/images/Logo/brain_transparent_logo_cropped.png"
                    />
                    <Flex direction="column" justifyContent="space-around" alignContent="center" >
                        <Heading level={1}>NiChart Cloud Login</Heading>
                    </Flex>
                    </Flex>
                    
                  </View>
                );
              },
            
              Footer() {
                const { tokens } = useTheme();
            
                return (
                  <View textAlign="center" padding={tokens.space.large}>
                    <Image
                      alt="UPenn Logo"
                      src="/images/Logo/upenn-logo-png.png"
                    />
                    <Text color={tokens.colors.neutral[80]}>
                      &copy; {new Date().getFullYear()}, Center for Biomedical Image Computing and Analytics (part of the University of Pennsylvania). 
                      All Rights Reserved.
                    </Text>
                    <Flex direction="row" justifyContent="space-around">
                        <Link rel="noopener noreferrer" href="https://www.upenn.edu/about/privacy-policy">Privacy Policy</Link>
                        <Text> | </Text>
                        <Link rel="noopener noreferrer" href="https://www.upenn.edu/about/disclaimer"> Disclaimer</Link>
                    </Flex>
                  </View>
                );
              },
            
              SignIn: {
                Header() {
                  const { tokens } = useTheme();
            
                  return (
                    <Flex direction="row" justifyContent="space-around">
                        <p>Click <Link href="/">here</Link> to return to the main site, <br/> or log in to continue to NiChart Cloud.</p>
                    </Flex>
                  );
                },
                Footer() {
                  const { toForgotPassword } = useAuthenticator();
            
                  return (
                    <View textAlign="center">
                      <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                      >
                        Reset Password
                      </Button>
                    </View>
                  );
                },
              },
            

            SignUp: {
              Header() {
                const { tokens } = useTheme();

                return (
                    <View textAlign="center" padding={tokens.space.large}>
                        <Text>Please ensure you have fully read the statements on the <Link href="/about">About page</Link> and <Link href="https://www.upenn.edu/about/privacy-policy">the general University of Pennsylvania Privacy Policy</Link> before continuing.</Text>
                        <Text></Text>
                    </View>
                )
              },
              Footer() {
                const {tokens } = useTheme();

                return (
                    <></>
                )
              },

              FormFields() {
                const { validationErrors } = useAuthenticator();
                const { tokens } = useTheme();
    
                return (
                  <>
                    {/* Re-use default `Authenticator.SignUp.FormFields` */}
                    <Authenticator.SignUp.FormFields />
                    
                    <View textAlign="center" padding={tokens.space.large}>
                    <Text>Passwords must be at least 8 characters and contain at least one number, one uppercase letter, one lowercase letter, and one special character.</Text>
                    </View>

                    <TextField
                      name="custom:Organization"
                      label="Organization (optional)"
                    />

                    <TextField
                     name="custom:Role"
                     label="Role (optional)"
                    />

                    {/* Append & require Terms & Conditions field to sign up  */}
                    <CheckboxField
                      errorMessage={validationErrors.acknowledgement}
                      hasError={!!validationErrors.acknowledgement}
                      name="acknowledgement"
                      value="yes"
                      label="I agree with the terms on the About page"
                    />
                    </>
                );
              },
            },
          }}
          services={{
            async validateCustomSignUp(formData) {
              var errors = {};
              if (!formData.acknowledgement) {
                errors['acknowledgement'] = 'You must agree to the terms to continue.'
              }

              if (!validateEmail(formData.email)) {
                errors["email"] = 'Please enter a valid email address.'
                };
              return errors; 
              },
            }}
        >
         {/*({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
         )*/}
         {props.children}
        </Authenticator>
      );

}


export default NiChartAuthenticator;