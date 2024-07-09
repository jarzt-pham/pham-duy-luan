//I Spent: 
// - Begin: 9/7/2024 3:15 PM
// - 20 mins to solve this problem: 
//   + 5 mins to write code scripts
//   + 15 mins to write a documentation

/**
 * Brute force Solution
 * Idea:
 * - Declare a variable answer to store the answer
 * - Use loop with pointer start from 1 to n
 * - Each a step of loop, adjust a value of answer
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function sumToNa(n: number): number {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    answer += i;
  }

  return answer;
}

/**
 * Recursive Solution
 * Idea:
 * - Create a condition to stop the recursive (if n === 1 return 1 or n)
 * - Call itself with return n + func(n-1)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) Need a memory of stack to store for every recursive
 */
function sumToNb(n: number): number {
  if (n === 1) return 1;
  return n + sumToNc(n - 1);
}

/**
 * Mathematics Solution (Optimal Solution)
 * Idea:
 * - I assume n equals with 3, so:
 * - 1 + 2 + 3 = 6
 * - I also can do it with reverse:
 * - 3 + 2 + 1 = 6
 * - I sum 2 above, I have:
 * - 4 + 4 + 4 = 6*2 => (3+1) + (3+1) + (3+1) = 6*2 => 3(3+1) = 6*2 => (3(3+1))/2 = 6
 * - Simplify to Formula following above: sumFromOneToN = n(n+1)/2
 * - Above I demonstrated why this formula works, you can do it with another number
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function sumToNc(n: number): number {
  return (n * (n + 1)) / 2;
}
