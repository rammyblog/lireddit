import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { default as NextLink } from 'next/link';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface Props {}

const ForgotPassword = (props: Props) => {
  const [complete, setComplete] = useState(false);
  const [forgotPasswword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPasswword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Text>
              If an account with that email exists, We have sent you an email
            </Text>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
              <Flex>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Forget Password
                </Button>
                <Box ml="auto" mt={4}>
                  <NextLink href="/login">
                    <Link>Login</Link>
                  </NextLink>
                </Box>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

// export default withUrqlClient(createUrqlClient)(ForgotPassword);

export default withApollo({ ssr: false })(ForgotPassword);
