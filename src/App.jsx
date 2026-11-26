import PaymentForm from './components/PaymentForm';

function App() {
  const handlePayment = (data) => {
    alert(`Pago procesado con éxito para ${data.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <PaymentForm amount={45.00} onSuccess={handlePayment} />
    </div>
  );
}

export default App;