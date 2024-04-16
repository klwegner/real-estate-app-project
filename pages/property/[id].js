import { useRouter } from "next/router";
import axios from "axios";
import Property from "@/components/Property";
import { Flex } from "@chakra-ui/react";

const API_URL = process.env.REACT_APP_API_URL;

export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;
  console.log("the id ", id);

  if (!id) {
    return {
      props: {
        error: true,
        errorMessage: "Property ID not found",
      },
    };
  }

  const response = await axios.get(`${API_URL}/api/properties/${id}`);
  console.log(response);

  //if 404 code
  if (!response.data) {
    console.log("no data returned");
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property: response.data,
    },
  };
}

export default function PropertyDetailsPage({ property, error, errorMessage }) {
  const router = useRouter();

  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <Flex justifyContent="center">
      <Property property={property} />
    </Flex>
  );
}
