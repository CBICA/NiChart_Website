import React, { useState, useEffect, useRef } from 'react';
import { Heading, Text, Button, Link, View, CheckboxField, Flex, Authenticator, Image, useTheme, useAuthenticator, TextField } from '@aws-amplify/ui-react';
import { Auth } from '@aws-amplify/auth';
import Modal from '../Components/Modal'
import { Typography } from '@mui/material';


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}
const TermsModal = ({ isOpen, onClose, onBottomReached }) => {
    const contentRef = useRef(null);

    const handleScroll = () => {
        const element = contentRef.current;
        if (element) {
            const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
            if (atBottom) {
                onBottomReached(true);
            }
        }
    };

    useEffect(() => {
        if (!isOpen) {
            onBottomReached(false);
        }
    }, [isOpen, onBottomReached]);

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <div ref={contentRef} onScroll={handleScroll} style={{ overflowY: 'scroll', height: '300px', scrollbarWidth: 'thin' }}>
            <Typography variant="h6" gutterBottom>! Please read the terms and scroll to the end of the text before closing this window !</Typography>
                <br></br>
                <br></br>
                <Typography variant="h4" gutterBottom>NiChart Cloud Privacy Statement</Typography>
                <Typography variant="body1">For convenience, NiChart is offered as a web service via NiChart Cloud, a service hosted using Amazon Web Services infrastructure. By uploading your data to NiChart, you are agreeing that you have valid, authorized access to that data and are not uploading personally-identifiable health information as defined by HIPAA. Uploaded scans are placed in a secure backend storage location in a private segment of the Amazon infrastructure  accessible via your login account. Individuals having root access to this server could also access your data for system maintenance purposes (e.g. to occasionally monitor folder size and delete data). Other than for system maintenance operations,  individuals with root access will never access, use or share your data with anyone.  Any uploaded data is retained for a maximum of 36 hours before being deleted. You may also choose to delete data immediately from the NiChart Cloud interface. By choosing to use NiChart Cloud, you agree that you understand these terms. If you wish to revoke this agreement at any time, simply discontinue using the service. You may contact us directly at <b><a href="mailto:nichart-devs@cbica.upenn.edu">nichart-devs@cbica.upenn.edu</a></b> about concerns related to the handling of your data. At your preference, you may also download the NiChart software tools for use on your own machine. Please see the components page for details.</Typography>
                <br></br>
                <br></br>
                <Typography variant="h4" gutterBottom>FDA Disclaimer</Typography>
                <Typography variant="body1">Please be advised that NiChart is a set of free software tools provided for research purposes. The statements made regarding the products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended for clinical purposes. All information presented here is not meant as a substitute for or alternative to information from health care practitioners.</Typography>
                <br></br>
                <br></br>
            </div>
        </Modal>
    );
};
export const NiChartAuthenticator = props => {
    const [verificationCodeModalOpen, setVerificationCodeModalOpen] = useState(false);
    const [verifyError, setVerifyError] = useState('');

    var currentEmail = '';
    const handleVerificationCodeOpen = () => {
        setVerificationCodeModalOpen(true);
    }
    
    const handleVerificationCodeClose = () => {
        setVerificationCodeModalOpen(false);
    }

    async function handleCodeModalSubmit (e) {
        // Check success with amplify signup call,
        // close modal if success, otherwise feed error to user via textfield (verifyError)
        e.preventDefault();

        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData);
        console.log(formData)
        const username = formData.get('email');
        const confirmationCode = formData.get('code');
        console.log(username)
        console.log(confirmationCode)
        try {
            const { isSignUpComplete, nextStep } = await Auth.confirmSignUp(
                username,
                confirmationCode
            );
            handleVerificationCodeClose();
            alert("Successfully verified! Please sign in.")
        } catch (error) {
            console.log('Error confirming signup ', error)
            var errorMessage=''
            switch (error.name) {
                case 'UserNotFoundException':
                  errorMessage = 'User not found. Check email/username.';
                  break;
                case 'NotAuthorizedException':
                  errorMessage = 'Incorrect password. Try again.';
                  break;
                case 'PasswordResetRequiredException':
                  errorMessage = 'Password reset required. Check email.';
                  break;
                case 'UserNotConfirmedException':
                  errorMessage = 'User not confirmed. Verify email.';
                  break;
                case 'CodeMismatchException':
                  errorMessage = 'Invalid confirmation code. Retry.';
                  break;
                case 'ExpiredCodeException':
                  errorMessage = 'Confirmation code expired. Resend code.';
                  break;
                case 'InvalidParameterException':
                  errorMessage = 'Invalid input. Check credentials.';
                  break;
                case 'InvalidPasswordException':
                  errorMessage = 'Invalid password. Follow policy.';
                  break;
                case 'TooManyFailedAttemptsException':
                  errorMessage = 'Too many failed attempts. Wait.';
                  break;
                case 'TooManyRequestsException':
                  errorMessage = 'Request limit reached. Wait and retry.';
                  break;
                case 'LimitExceededException':
                  errorMessage = 'User pool full. Retry later.';
                  break;
                default:
                  errorMessage = 'Unknown error. Contact nichart-devs@cbica.upenn.edu for assistance.';
              }
            setVerifyError(errorMessage)
        }
    }

    function updateCurrentEmailInput (e) { currentEmail = e.target.value; }

    async function sendNewVerificationEmail (email) {
        try {
             await Auth.resendSignUp(username);
             console.log('code resent successfully');
            } catch (err) {
                console.log('error resending code: ', err);
            }
        }

    function VerificationCodeModal() {
        return (
        <Modal 
            open={verificationCodeModalOpen}
            handleClose={handleVerificationCodeClose}
            width="50%"
            title="Verification Code"
            content=""
        >
        <View textAlign="center">
        <Text>If you received a verification code but navigated away from the page, please enter your email address and code here to verify your account.</Text>
        <form class="form-example" onSubmit={handleCodeModalSubmit}>
        <div class="form-example">
            <label for="email">Enter your email address: </label>
            <input oninput={updateCurrentEmailInput} type="email" name="email" id="email" required autofocus/>
        </div>
        <div class="form-example">
            <label for="code">Enter the code you received in your verification email: </label>
            <input type="number" name="code" id="code" required />
        </div>
        <div class="form-example">
            <input type="submit" value="Verify" />
        </div>
        </form>
        <Text color="red.100">{verifyError}</Text>
        <Text>if your code has expired, enter your email and then click 
            <Button
                fontWeight="normal"
                onClick={sendNewVerificationEmail}
                size="small"
                variation="link"
            >here</Button> to re-send your verification code. The email may take a few minutes to arrive.</Text>
        </View>
        </Modal>
        )
    }

    // TermsModal stuff
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        if (!isCheckboxChecked) {
            setTermsModalOpen(true);
        } else {
            setIsCheckboxChecked(false);
        }
    };

    const handleTermsModalClose = () => {
        setTermsModalOpen(false);
    };

    const handleBottomReached = (reached) => {
        if (reached) {
          setIsCheckboxChecked(true);
      }
    };
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
                    <>
                    <View textAlign="center" padding={tokens.space.large}>
                        <Text>Please ensure you have fully read the statements on the <Link href="/about">About page</Link> and <Link href="https://www.upenn.edu/about/privacy-policy">the general University of Pennsylvania Privacy Policy</Link> before continuing.</Text>
                        <Text></Text>
                    </View>
                    <View textAlign="center" padding={tokens.space.large}>
                        <Text><b>Already have a verification code?</b> Click 
                        <Button
                            fontWeight="normal"
                            onClick={handleVerificationCodeOpen}
                            size="small"
                            variation="link"
                        >here</Button> to verify your account.</Text>
                        <VerificationCodeModal/>
                      </View>
                      <View textAlign="left" padding={tokens.space.large}>
                      <CheckboxField
                          id="termsCheckbox"
                          name="acknowledgement"
                          label="I have fully read and agreed with the terms on the About page."
                          onChange={handleCheckboxChange}
                          checked={isCheckboxChecked}
                      />
                      <TermsModal
                          isOpen={termsModalOpen}
                          onClose={handleTermsModalClose}
                          onBottomReached={handleBottomReached}
                      />
                    </View>
                    </>
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