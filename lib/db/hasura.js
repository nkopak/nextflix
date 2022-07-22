import { hasuraAdminUrl } from '../../config/url';

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    hasuraAdminUrl,
    {
      method: 'POST',
      headers:{
        // 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables,
        operationName
      })
    }
  );

  return result.json();
}

export async function createNewUser(token, metadata){
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        issuer
        id
      }
    }
  }
`;

  const {issuer, email, publicAddress} = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress
    },
    token
  );
  console.log({response, issuer});

  return response;
}

export async function isNewUser(token, issuer){
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    {issuer},
    token
  );

  return response?.data?.users?.length === 0;
}

