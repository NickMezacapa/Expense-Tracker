import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './Components/BudgetCard';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import { useBudgets } from './contexts/BudgetContext';
import './App.css';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
    <Container className="my-4">

      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>


      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1rem", 
          alignItems: "flex-start" 
          }}>

        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id)
                        .reduce((total, expense) => total + expense.amount, 0);
          return (
          <BudgetCard
            key={budget.id} 
            name={budget.name} 
            amount={amount} 
            max={budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            />
          )
        })}

        <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} />
        <TotalBudgetCard />
      </div>
      

    </Container>

    <AddBudgetModal 
      show={showAddBudgetModal} 
      handleClose={() => setShowAddBudgetModal(false)} 
    />
    <AddExpenseModal 
      show={showAddExpenseModal}
      defaultBudgetId={addExpenseModalBudgetId} 
      handleClose={() => setShowAddExpenseModal(false)} 
    />

    </>
  );
}

export default App;
