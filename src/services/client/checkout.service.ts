import { prisma } from "config/client";

const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: string
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          cartDetails: true,
        },
      });

      if (cart) {
        const cartDetail = cart?.cartDetails.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        }));
        await tx.order.create({
          data: {
            receiverName: receiverName,
            receiverAddress: receiverAddress,
            receiverPhone: receiverPhone,
            totalPrice: +totalPrice,
            paymentStatus: "PAYMENT_UNPAID",
            paymentMethod: "COD",
            status: "PENDING",
            userId,
            orderDetails: {
              create: cartDetail,
            },
          },
        });
        await tx.cartDetail.deleteMany({
          where: {
            cartId: cart.id,
          },
        });
        await tx.cart.delete({
          where: {
            id: cart.id,
          },
        });
      }
      if (!cart) {
        throw new Error("Giỏ hàng không tồn tại");
      }
      //check product
      for (let i = 0; i < cart.cartDetails.length; i++) {
        const productId = cart.cartDetails[i].productId;
        const product = await tx.product.findFirst({
          where: { id: productId },
        });
        if (!product || product.quantity < cart.cartDetails[i].quantity) {
          throw new Error(
            `Sản phẩm ${product?.name} không tồn tại hoặc số lượng không đủ`
          );
        }
        await tx.product.update({
          where: { id: productId },
          data: {
            quantity: {
              decrement: cart.cartDetails[i].quantity,
            },
            sold: {
              increment: cart.cartDetails[i].quantity,
            },
          },
        });
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};
export { handlePlaceOrder };
