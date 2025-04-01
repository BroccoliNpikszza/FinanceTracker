import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface User {
  _id: string;
  username?: string;
  email?: string;
}

interface AccountFormData {
  accountId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'loan';
  institution: string;
  balance: number;
  creditLimit: number;
  interestRate: number;
  interestType: 'none' | 'simple' | 'compound';
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
  dueDate: number;
  accountNumber: string;
  description: string;
}

function Account(){
  const [formData, setFormData] = useState<AccountFormData>({
    accountId: '',
    name: '',
    type: 'checking',
    institution: 'nullBank',
    balance: 0,
    creditLimit: 0,
    interestRate: 0,
    interestType: 'none',
    compoundingFrequency: 'monthly',
    dueDate: 1,
    accountNumber: '',
    description: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<User[]>('/api/users')
      .then((response: AxiosResponse<User[]>) => {
        setUsers(response.data);
      })
      .catch((err: AxiosError) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/accounts', formData)
      .then(() => {
        setSuccessMessage('Account created successfully!');
        setError(null);
        setFormData({
            accountId: '',
            name: '',
            type: 'checking',
            institution: 'nullBank',
            balance: 0,
            creditLimit: 0,
            interestRate: 0,
            interestType: 'none',
            compoundingFrequency: 'monthly',
            dueDate: 1,
            accountNumber: '',
            description: '',
        });
      })
      .catch((err: AxiosError) => {
        console.error('Error creating account:', err);
        setError('Failed to create account.');
        setSuccessMessage(null);
      });
  };

  return (
    <div>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <select name="accountId" value={formData.accountId} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username || user.email}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Account Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Account Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit</option>
            <option value="investment">Investment</option>
            <option value="loan">Loan</option>
          </select>
        </label>
        <br />
        <label>
          Institution:
          <input type="text" name="institution" value={formData.institution} onChange={handleChange} />
        </label>
        <br />
        <label>
          Balance:
          <input type="number" name="balance" value={formData.balance} onChange={handleChange} required />
        </label>
        <br />
        {formData.type === 'credit' && (
          <>
            <label>
              Credit Limit:
              <input type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange} required />
            </label>
            <br />
          </>
        )}
        <label>
          Interest Rate:
          <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Interest Type:
          <select name="interestType" value={formData.interestType} onChange={handleChange}>
            <option value="none">None</option>
            <option value="simple">Simple</option>
            <option value="compound">Compound</option>
          </select>
        </label>
        <br />
        <label>
          Compounding Frequency:
          <select name="compoundingFrequency" value={formData.compoundingFrequency} onChange={handleChange}>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </label>
        <br />
        {(formData.type === 'credit' || formData.type === 'loan') && (
          <>
            <label>
              Due Date:
              <input type="number" name="dueDate" value={formData.dueDate} onChange={handleChange} min="1" max="31" />
            </label>
            <br />
          </>
        )}
        <label>
            Account Number:
            <input type = "text" name = "accountNumber" value = {formData.accountNumber} onChange = {handleChange} pattern = "\\d{4}" title = "Account number must be 4 digits"/>
        </label>
        <br />
        <label>
            Description:
            <textarea name = "description" value = {formData.description} onChange = {handleChange}/>
        </label>
        <br/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Account;