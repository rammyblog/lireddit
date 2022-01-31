import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import EditDeletePostButtons from '../../components/EditDeletePostButtons';
import Layout from '../../components/Layout';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { withApollo } from '../../utils/withApollo';

interface Props {}

const Post = (props: Props) => {
  const { data, loading } = useGetPostFromUrl();
  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout>
        <div>Could not find post</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading mb="4">{data.post.title}</Heading>
      <Box mb="4">{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

// export default withUrqlClient(createUrqlClient, { ssr: true })(Post);

export default withApollo({ ssr: true })(Post);
