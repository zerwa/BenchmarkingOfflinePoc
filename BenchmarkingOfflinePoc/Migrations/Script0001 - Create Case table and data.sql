CREATE TABLE [Case] (
	[CaseId] INT IDENTITY,
	[CaseName] NVARCHAR(50) NOT NULL,
	[CaseCode] NVARCHAR(5) NOT NULL,
	PRIMARY KEY ([CaseId])
);

-- Insert test Cases
INSERT INTO [Case]
VALUES 
	('Test Case 1', 'X012'),
	('Test Case 2', 'WA09'),
	('Test Case 3', 'N1JH'),
	('Test Case 4', '89JS');