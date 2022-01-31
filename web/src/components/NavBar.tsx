import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { default as NextLink } from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

interface Props {}

const NavBar = (props: Props) => {
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const router = useRouter();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  if (loading) {
    //   you can set loading state here
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color={'white'} mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color={'white'}>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align={'center'}>
        <Box mr="2">
          <Button as={Link} href="create/post">
            create post
          </Button>
        </Box>
        <Box mr="2">{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          variant={'link'}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex="1"
      bg="tan"
      p={4}
      ml={'auto'}
      align="center"
    >
      <Flex maxW={800} align="center" m="auto" flex={1}>
        <Link href="/">
          <Heading>LiReddit</Heading>
        </Link>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
