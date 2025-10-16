import Card from "../Card";

export default function CardExample() {
  return (
    <div className="p-6 max-w-sm">
      <Card title="Example Card" description="A themed card component" interactive>
        <p>This is a card with the Mentor Health theme applied.</p>
      </Card>
    </div>
  );
}
