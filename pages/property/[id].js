"use client";

// import { useRouter } from "next/router";
import axios from "axios";
import Property from "@/components/Property";
import { Flex, Box, Button, ButtonGroup } from "@chakra-ui/react";
import Link from "next/link";

import { useRouter } from "next/navigation";
// import { ButtonGroup } from "react-bootstrap";

const API_URL = "http://localhost:5005";

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
    <Box>
      <Flex justifyContent="center">
        <Property property={property} />
      </Flex>
<Flex justifyContent="center">

<ButtonGroup>

        <Button>
          <Link
            href={`/editProperty?id=${property._id}&nm=${property.name}&pt=${property.propertyType}&ds=${property.description}&ad=${property.address}&sf=${property.squareFootage}&baths=${property.numBaths}&beds=${property.numBeds}&pr=${property.price}&hoa=${property.hasHOA}&fl=${property.inFloodZone}&am=${property.amenitiesIncluded}&img=${property.imageUrl}`}
            passHref
          >
            Edit this Property
          </Link>
        </Button>
        <Button onClick={() => deleteProperty(property._id, router)}>
          Delete This Property
        </Button>
</ButtonGroup>
</Flex>

    </Box>
  );
}

function deleteProperty(id, routerInstance) {
  axios
    .delete(`${API_URL}/api/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
    .then((res) => {
      console.log(res);
      routerInstance.push("/");
    })
    .catch((err) => console.error(err));
}
