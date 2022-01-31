import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import post from '../pages/create/post';

interface Props {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons = ({ id, creatorId }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();

  return (
    <>
      {meData?.me?.id === creatorId && (
        <Box>
          <Link href="/post/edit/id" as={`/post/edit/${id}`}>
            <IconButton
              variant={'green'}
              aria-label="edit post"
              icon={<EditIcon />}
            />
          </Link>
          <IconButton
            variant={'red'}
            aria-label="delete post"
            icon={<DeleteIcon />}
            onClick={() => {
              deletePost({
                variables: { id },
                update: (cache) => {
                  cache.evict({ id: `Post:${id}` });
                },
              });
            }}
          />
        </Box>
      )}
    </>
  );
};

export default EditDeletePostButtons;
