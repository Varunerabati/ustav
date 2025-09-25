import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  landmark: string;
  paymentMethod: 'cod' | 'razorpay' | 'stripe';
}

const Checkout = () => {
  const { cartItems, getTotalPrice, getCartCount, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    landmark: '',
    paymentMethod: 'cod'
  });

  const totalAmount = getTotalPrice();
  const totalItems = getCartCount();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: value as CheckoutForm['paymentMethod']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'pincode'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof CheckoutForm]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "Complete all required information to place your order.",
        variant: "destructive"
      });
      return;
    }

    // Simulate order placement
    toast({
      title: "Order placed successfully!",
      description: `Order confirmation will be sent to ${formData.email}`,
    });

    // Clear cart after successful order
    clearCart();
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      pincode: '',
      landmark: '',
      paymentMethod: 'cod'
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-3xl font-playfair font-bold text-foreground mb-4">
              No Items in Cart
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
              Checkout
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your order for {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/cart">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-playfair">
                    <Truck className="h-5 w-5 mr-2 text-primary" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-foreground font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-foreground font-medium">
                      Shipping Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pincode" className="text-foreground font-medium">
                        PIN Code *
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter PIN code"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="landmark" className="text-foreground font-medium">
                        Landmark (Optional)
                      </Label>
                      <Input
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-playfair">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-grow cursor-pointer">
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg opacity-75">
                      <RadioGroupItem value="razorpay" id="razorpay" disabled />
                      <Label htmlFor="razorpay" className="flex-grow cursor-pointer">
                        <div>
                          <p className="font-medium">Razorpay (Coming Soon)</p>
                          <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg opacity-75">
                      <RadioGroupItem value="stripe" id="stripe" disabled />
                      <Label htmlFor="stripe" className="flex-grow cursor-pointer">
                        <div>
                          <p className="font-medium">Stripe (Coming Soon)</p>
                          <p className="text-sm text-muted-foreground">International cards</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg"
              >
                Confirm Order - ₹{totalAmount.toLocaleString()}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-card border-0 gradient-card sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl font-playfair">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;