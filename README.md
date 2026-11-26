# Pago reutilizable

Formulario de pago responsive construido con React, Tailwind CSS y Lucide. Incluye formato automático de número de tarjeta y vencimiento, detección visual de Visa y Mastercard, estados de carga y una interfaz adaptable.

> Este repositorio es una demostración de interfaz. Actualmente simula el procesamiento del pago y no procesa cobros reales ni almacena datos sensibles.

## Características

- Nombre del titular con filtrado de caracteres
- Número de tarjeta con formato `0000 0000 0000 0000`
- Identificación visual de Visa y Mastercard
- Fecha de vencimiento con formato `MM/YY`
- Validación básica de mes y campo CVC
- Estado de procesamiento configurable
- Callback `onSuccess` para conectar la interfaz con tu flujo
- Diseño responsive con React 19 y Tailwind CSS 4

## Tecnologías

- React 19
- Vite 8
- Tailwind CSS 4
- Lucide React
- ESLint

## Requisitos

- Node.js 20 o superior
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite en la terminal, normalmente `http://localhost:5173`.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la compilación de producción |
| `npm run preview` | Sirve localmente la compilación generada |
| `npm run lint` | Ejecuta las reglas de ESLint |

## Uso

```jsx
import PaymentForm from './components/PaymentForm';

function Checkout() {
  const handleSuccess = (paymentData) => {
    // Conecta aquí una tokenización segura con tu proveedor de pagos.
    console.log(paymentData);
  };

  return (
    <PaymentForm
      amount={45}
      onSuccess={handleSuccess}
    />
  );
}
```

## API del componente

### `PaymentForm`

| Prop | Tipo | Requerida | Descripción |
| --- | --- | --- | --- |
| `amount` | `number` | Sí | Importe mostrado en el encabezado |
| `onSuccess` | `(data: object) => void` | Sí | Callback ejecutado después de la espera simulada |

El objeto recibido por `onSuccess` contiene `name`, `number`, `expiry` y `cvc`.

## Flujo de pago seguro

Este componente no debe enviar directamente número de tarjeta, vencimiento o CVC a tu backend.

Para uso real:

1. Tokeniza los datos con un proveedor compatible con PCI DSS, como Stripe, Adyen o Mercado Pago.
2. No guardes datos de tarjeta sin alcance, auditoría y certificación correspondientes.
3. Valida el monto y el estado del pedido en el servidor.
4. Confirma el pago mediante la API oficial del proveedor.
5. Implementa validación de vencimiento, longitud y marcas reales de tarjeta.
6. Añade pruebas unitarias, manejo de errores y recuperación ante fallos.

## Valor competitivo y alcance

El valor principal del proyecto es educativo y de prototipado: ofrece una interfaz clara, formateo básico y una integración sencilla mediante props. Es reusable en demos, ejercicios, MVP visuales y frontends internos.

No compite todavía con soluciones comerciales de checkout porque carece de procesamiento seguro, integración de proveedores, 3D Secure, webhooks, prevención de fraude, reembolsos, suscripciones, internacionalización y cumplimiento PCI. El componente debe considerarse una base visual, no una pasarela de pagos.

## Licencia

Distribuido bajo la licencia MIT. Consulta [LICENSE](./LICENSE) para el texto completo en español y la versión original en inglés.
