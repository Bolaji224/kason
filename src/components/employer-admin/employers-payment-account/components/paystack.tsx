import { PaystackButton } from 'react-paystack';
import { httpPostWithToken } from '../../../../utils/http_utils';
import { useToast } from '@chakra-ui/react';




export const PaystackHookExample = ({config, close, amount, success}:any) => {
    const toast = useToast();
    // you can call this function anything
const onSuccess = async (reference:any, amount : any) => {
    // Implementation for whatever you want to do with reference and after success call.
    close()
    let fd = {
      ...reference,
      amount
    }
    const verify = await httpPostWithToken("employer/verify-payment", fd)
    if(verify.status == "success") {
        success()
        toast({
            status : "success",
            title : "Payment successful",
            isClosable : true,
            duration : 5000
          })
    }else {
        toast({
            status : "error",
            title : verify.error || verify.message,
            isClosable : true,
            duration : 5000
          })
    }
  };
  
// you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        alert('closed')
        close()
    }
    const componentProps = {
        ...config,
        text: 'Pay Now - NGN' + amount,
        onSuccess: (reference:any) => onSuccess(reference, amount),
        onClose: onClose,
    };

    return (
      <div>
        <PaystackButton {
            ...componentProps
        } />
      </div>
    );
};