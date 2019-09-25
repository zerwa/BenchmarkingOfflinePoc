CREATE TABLE [Function] (
	[FunctionId] INT IDENTITY,
	[FunctionName] NVARCHAR(50),
	[FunctionDisplayName] NVARCHAR(50),
	PRIMARY KEY ([FunctionId])
);

INSERT INTO [Function] VALUES
	('PROCUREMENT', 'Procurement');

CREATE TABLE [Case] (
	[CaseId] INT IDENTITY,
	[CaseName] NVARCHAR(50) NOT NULL,
	[CaseCode] NVARCHAR(5) NOT NULL,
	[FunctionId] INT,
	PRIMARY KEY ([CaseId]),
	CONSTRAINT FK_Case_Function FOREIGN KEY ([FunctionId]) REFERENCES [Function]([FunctionId])
);

-- Insert test Cases
INSERT INTO [Case]
VALUES 
	('Test Case 1', 'X012', (SELECT FunctionId FROM [Function] WHERE FunctionName = 'PROCUREMENT')),
	('Test Case 2', 'WA09', (SELECT FunctionId FROM [Function] WHERE FunctionName = 'PROCUREMENT')),
	('Test Case 3', 'N1JH', (SELECT FunctionId FROM [Function] WHERE FunctionName = 'PROCUREMENT')),
	('Test Case 4', '89JS', (SELECT FunctionId FROM [Function] WHERE FunctionName = 'PROCUREMENT'));