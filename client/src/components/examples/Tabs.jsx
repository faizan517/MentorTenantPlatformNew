import Tabs from "../Tabs";

export default function TabsExample() {
  const tabs = [
    { value: "tab1", label: "Tab 1", content: <p>Content for tab 1</p> },
    { value: "tab2", label: "Tab 2", content: <p>Content for tab 2</p> },
    { value: "tab3", label: "Tab 3", content: <p>Content for tab 3</p> },
  ];

  return (
    <div className="p-6">
      <Tabs defaultValue="tab1" tabs={tabs} />
    </div>
  );
}
