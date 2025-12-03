**⚠️ Work in Progress:** This game is under development.

# Pair ’em Up — Number Matching Puzzle Game

**Pair ’em Up** is a strategic number-matching puzzle game where players must clear a grid by finding valid pairs of numbers. The goal is to reach **100 points** before valid moves and assist tools run out.

The game includes three modes, a complete scoring system, assist tools, persistent saving, and detailed interaction rules for working with the grid.


## Table of Contents
1. [Game Features](#game-features)
   - [Game Modes](#game-modes)
   - [Core Mechanics (Work in Progress)](#core-mechanics-work-in-progress)
   - [Assist Tools](#assist-tools)
2. [Game Rules](#game-rules)
   - [Valid Pairs](#valid-pairs)
   - [Pair Connectivity Rules](#pair-connectivity-rules)
3. [Scoring System](#scoring-system)
4. [Assist Tools Details](#assist-tools-details)
5. [Win and Lose Conditions](#win-and-lose-conditions)
6. [User Interface](#user-interface)
   - [Start Screen](#start-screen)
   - [Game Screen](#game-screen)
7. [Technologies](#technologies)


## Game Features

### Game Modes
- **Classic Mode:** Numbers 1–19 arranged in sequential order

### Core Mechanics (Work in Progress)
- Matching pairs of identical numbers or numbers that sum to 10  
- Connectivity rules for selecting valid pairs  
- Removing cells without auto-shifting remaining numbers  
- Visual and audio feedback for all types of interactions  

### Assist Tools
- Hints (*in progress*)  
- Revert  
- Add Numbers  
- Shuffle (*in progress*)  
- Eraser (*in progress*)  

Each assist has usage limits with counters displayed in the UI.


## Game Rules

### Valid Pairs
A pair is considered valid if it meets one of the following conditions:

- Two identical numbers  
- Two numbers whose sum equals 10  
- Special case: 5 + 5 gives a bonus score  

### Pair Connectivity Rules
Two cells can form a pair if:

- They are adjacent vertically or horizontally  
- They are in the same row or column with empty cells between them  
- They cross row boundaries (last cell of a row with the first cell of the next row)


## Scoring System

| Pair Type          | Points |
|--------------------|--------|
| Identical numbers  | +1     |
| Sum-to-10          | +2     |
| Double five (5+5)  | +3     |


## Assist Tools Details

| Tool         | Description | Limit |
|--------------|-------------|-------|
| Hints        | Shows the number of available moves | unlimited (max “5+”) |
| Revert       | Undo the last move | 1 move at a time |
| Add Numbers  | Adds numbers depending on mode rules | 10 uses |
| Shuffle      | Randomizes the current grid | 5 uses |
| Eraser       | Removes any one number | 5 uses |


## Win and Lose Conditions

### Win
Reach **100 or more points**.

### Lose (*in progress*)
- No valid moves available and all assist tools are used  
- Or the grid reaches the **50-line limit** when adding numbers  


## User Interface

### Start Screen
- Game title  
- Author with GitHub link  
- Mode game

### Game Screen
- Current mode indicator  
- Grid with 9 columns and dynamically increasing rows  
- Score and target score  
- Timer (MM:SS)  
- Assist tool buttons with counters  
- Reset, Save, and Continue buttons  
- Settings button  


## Technologies

### Development  
- JavaScript  
- HTML, SCSS  
- Vite  

### Code Quality
- ESLint  
- Prettier  
- Husky  
- Commitlint  
- Lint-staged  
