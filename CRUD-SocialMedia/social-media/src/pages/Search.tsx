import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import NavigationSide from '../components/NavigationSide';
interface Account {
  id: number;
  name: string;
  profilePhoto: string; // New field for profile photo URL
  followed: boolean;
}

const Search: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: 'John Doe', profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg', followed: false },
    { id: 2, name: 'Jane Smith', profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg', followed: true },
    { id: 3, name: 'Alice Brown', profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg', followed: false },
    { id: 4, name: 'Bob Johnson', profilePhoto: 'https://randomuser.me/api/portraits/men/4.jpg', followed: true },
    { id: 5, name: 'Eve White', profilePhoto: 'https://randomuser.me/api/portraits/women/5.jpg', followed: false },
    // Add more accounts as needed
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAccounts = filteredAccounts.sort((a, b) => a.name.localeCompare(b.name));

  const toggleFollow = (accountId: number) => {


      const followButton = document.getElementById('follow');
      const isFollowing = followButton?.innerHTML === 'Following';
      if (!isFollowing) {
        fetch(`http://localhost:3000/${userId}/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follower_id: 1,  // Replace with actual follower's user ID
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Followed:', data);
          // Update UI as needed
        })
        .catch(error => console.error('Error following user:', error));
      } else {
        fetch(`http://localhost:3000/${userId}/unfollow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follower_id: 1,  // Replace with actual follower's user ID
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Unfollowed:', data);
          // Update UI as needed
        })
        .catch(error => console.error('Error unfollowing user:', error));
      }
    const updatedAccounts = accounts.map(account =>
      account.id === accountId ? { ...account, followed: !account.followed } : account
    );
    setAccounts(updatedAccounts);
  };

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="hidden sm:block">
      <Navigation />
    </div>
    <div className="block sm:hidden">
      <NavigationSide />
      <br />
      <br />
      <br />
    </div>
    
      <h1 className="my-5 text-5xl dark:text-white"> Search</h1>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search accounts..."
        className="p-2 border border-gray-300 rounded-lg mb-4 w-3/4"
        value={searchTerm}
        onChange={handleSearch}
      />
      
      {/* Display accounts */}
      {sortedAccounts.length > 0 ? (
        <ul className="w-3/4">
          {sortedAccounts.map((account) => (
            <li key={account.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <img src={account.profilePhoto} alt="Profile" className="h-12 w-12 rounded-full" />
                <span className="font-bold capitalize dark:text-white">{account.name}</span>
              </div>
              {account.followed ? (
                <button
                  onClick={() => toggleFollow(account.id)}
                  className="px-3 py-1 bg-gray-300  rounded-md"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => toggleFollow(account.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Follow
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg dark:text-white">No accounts found.</p>
      )}
    </div>
  );
}

export default Search;
