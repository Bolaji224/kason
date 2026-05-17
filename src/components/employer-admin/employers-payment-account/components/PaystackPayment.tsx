import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { httpPostWithToken, httpGetWithToken } from '../../../../utils/http_utils';

interface PaystackPaymentProps {
  amount: number;
  email: string;
  reference: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  paymentId: number;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  email,
  reference,
  onSuccess,
  onClose,
  paymentId,
}) => {
  const toast = useToast();
  const [paystackPublicKey, setPaystackPublicKey] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Fetch public key from backend
  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await httpGetWithToken('paystack/public-key');
        if (response?.public_key) {
          setPaystackPublicKey(response.public_key);
          console.log('Public key fetched successfully');
        } else {
          throw new Error('No public key in response');
        }
      } catch (error) {
        console.error('Error fetching Paystack key:', error);
        toast({
          status: 'error',
          title: 'Error loading payment system',
          description: 'Failed to fetch Paystack configuration',
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPublicKey();
  }, [toast]);

  // Load Paystack script
  useEffect(() => {
    const loadPaystackScript = () => {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).PaystackPop) {
          setScriptLoaded(true);
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;

        script.onload = () => {
          if ((window as any).PaystackPop) {
            setScriptLoaded(true);
            console.log('Paystack script loaded successfully');
            resolve();
          } else {
            reject(new Error('PaystackPop not available after script load'));
          }
        };

        script.onerror = () => {
          reject(new Error('Failed to load Paystack script'));
        };

        document.head.appendChild(script);
      });
    };

    loadPaystackScript().catch((error) => {
      console.error('Script loading error:', error);
      toast({
        status: 'error',
        title: 'Failed to load Paystack',
        isClosable: true,
      });
    });
  }, [toast]);

  const verifyPayment = async (paystackReference: string) => {
    try {
      console.log('Verifying payment with:', {
        reference: paystackReference,
        payment_id: paymentId,
      });
      
      const response = await httpPostWithToken('employer/verify-payment', {
        reference: paystackReference,
        payment_id: paymentId,
      });
      
      console.log('Verification response:', response);

      if (response.status === 'success') {
        toast({
          status: 'success',
          title: 'Payment successful!',
          description: 'Funds have been transferred to the candidate',
          isClosable: true,
        });
        onSuccess(paystackReference);
      } else {
        toast({
          status: 'error',
          title: 'Payment verification failed',
          description: response.error,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        status: 'error',
        title: 'Error verifying payment',
        isClosable: true,
      });
    }
  };

  const initiatePayment = () => {
    try {
      const PaystackPop = (window as any).PaystackPop;

      if (!PaystackPop) {
        console.error('PaystackPop not available');
        toast({
          status: 'error',
          title: 'Paystack not loaded',
          description: 'Please refresh the page and try again',
          isClosable: true,
        });
        return;
      }

      if (!paystackPublicKey) {
        toast({
          status: 'error',
          title: 'Configuration error',
          description: 'Paystack key not loaded',
          isClosable: true,
        });
        return;
      }

      console.log('Initiating payment with:', {
        key: paystackPublicKey,
        email,
        amount: amount * 100,
        reference,
      });

      const handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: email,
        amount: amount * 100,
        currency: 'NGN',
        ref: reference,
        onClose: () => {
          console.log('Payment window closed');
          toast({
            status: 'info',
            title: 'Payment window closed',
            isClosable: true,
          });
          onClose();
        },
        callback: (response: any) => {
          console.log('Payment callback:', response);
          if (response && response.status === 'success') {
            verifyPayment(response.reference);
          } else {
            toast({
              status: 'error',
              title: 'Payment failed',
              description: 'Please try again',
              isClosable: true,
            });
          }
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        status: 'error',
        title: 'Error initiating payment',
        description: error instanceof Error ? error.message : 'Unknown error',
        isClosable: true,
      });
    }
  };

  return (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      {loading || !scriptLoaded ? (
        <div className="text-center py-6">
          <p className="text-gray-600 mb-2">Loading payment system...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Amount: <strong className="text-lg">₦{amount.toLocaleString()}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Email: <strong className="text-xs">{email}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Reference: <strong className="font-mono text-xs break-all">{reference}</strong>
            </p>
            <p className="text-sm text-blue-600 font-medium">
              Click below to proceed with secure payment
            </p>
          </div>

          <button
            onClick={initiatePayment}
            disabled={!scriptLoaded || !paystackPublicKey}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Pay ₦{amount.toLocaleString()} with Paystack
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-600 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel Payment
          </button>

          <p className="text-xs text-gray-500 text-center">
            Secured by Paystack • No real charges in test mode
          </p>
        </>
      )}
    </div>
  );
};

export default PaystackPayment;