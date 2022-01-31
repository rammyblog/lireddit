import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import EditDeletePostButtons from '../components/EditDeletePostButtons';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  // URQL
  // const [variables, setVariables] = useState({
  //   limit: 10,
  //   cursor: null as string | null,
  // });

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null as string | null,
    },
    notifyOnNetworkStatusChange: true,
  });
  if (!loading && !data) {
    return (
      <Layout>
        <div>{error?.message}</div>
      </Layout>
    );
  }
  return (
    <Layout>
      {loading && !data ? (
        'Loading'
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map(
            (post) =>
              post && (
                <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={post} />
                  <Box flex={1} s>
                    <Link href="/post/[id]" as={`/post/${post.id}`}>
                      <Heading fontSize="xl" style={{ cursor: 'pointer' }}>
                        {post.title}
                      </Heading>
                    </Link>
                    <Text>Posted by {post.creator.username}</Text>
                    <Flex align={'center'}>
                      <Text flex={1} mt={4}>
                        {post.textSnippet}
                      </Text>
                      <Box ml="auto">
                        <EditDeletePostButtons
                          id={post.id}
                          creatorId={post.creator.id}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex justifyContent="center" mt={4}>
          <Button
            isLoading={loading}
            my={4}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });

              // setVariables({
              //   limit: variables.limit,
              //   cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              // })
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
// export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
