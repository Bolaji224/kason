import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Images from './constant/Images';
 
import { useNavigate } from "react-router-dom";
import { httpGetWithToken } from "../utils/http_utils";

interface iDelete {
    isOpen : any,
    onClose : any,
    url : any,
    onFinished : any,
    title : string
}
export default function DeleteAction({ isOpen, onClose, onFinished, url, title }:iDelete) {
  const finishSelection = () => {
    onClose();
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const deleteAction = async () => {
    setIsLoading(true);
    var response = await httpGetWithToken(url);
    if (response.error) {
      toast({
        title: "Sorry, we hit a snag!",
        description: `${response.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Deleted successfully",
        // description: `${response.error}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      onFinished();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"lg"}
      isCentered
      scrollBehavior={"inside"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius={16} p={4}>
        <ModalBody textAlign={"center"} marginBottom={"0"}>
          <Flex justifyContent={"center"}>
            <Image src={Images.delete_basket_y as string} boxSize={"70px"} />
          </Flex>
          <ModalHeader textAlign={"center"}>{title}?</ModalHeader>
          <Text textAlign={"center"}>This action cannot be reveresed.</Text>
          <Box w="100%" mt={"25px"}>
            <Button
              size={"lg"}
              w={"100%"}
              color="#fff"
              borderRadius={64}
              background={"#ee009d"}
              onClick={() => onClose()}
            >
              Cancel
            </Button>

            <Button
              isLoading={isLoading}
              mt={8}
              mb={8}
              size={"lg"}
              color={"red"}
              w={"100%"}
              shadow={"sm"}
              border="1px solid #EBECEF"
              borderRadius={64}
              onClick={() => deleteAction()}
            >
              {title}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
