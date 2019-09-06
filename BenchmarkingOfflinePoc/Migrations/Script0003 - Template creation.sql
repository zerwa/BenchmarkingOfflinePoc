CREATE TABLE SurveyTemplate (
	[SurveyTemplateId] INT IDENTITY,
	[CaseId] INT,
	[Version] INT
	PRIMARY KEY([SurveyTemplateId]),
	CONSTRAINT FK_SurveyTemplate_Case FOREIGN KEY ([CaseId]) REFERENCES [Case]([CaseId])
);

-- Create a version 1 for each case
INSERT INTO SurveyTemplate 
	SELECT 
		CaseId, 
		1
	FROM [Case];
GO

-- Each template will have X amount of tabs
CREATE TABLE [Tab] (
	[TabId] INT IDENTITY,
	[SurveyTemplateId] INT,
	[TabName] NVARCHAR(50),
	[TabOrder] INT,
	PRIMARY KEY(TabId),
	CONSTRAINT FK_Tab_SurveyTemplate FOREIGN KEY ([CaseId]) REFERENCES [Case]([CaseId]),
	CONSTRAINT UK_TabOrder_SurveyTemplate UNIQUE([TabOrder], [SurveyTemplateId])
);

-- Insert the three preliminary tabs
INSERT INTO [Tab]
	SELECT
		SurveyTemplateId,
		'Numerics',
		1
	FROM SurveyTemplate;

INSERT INTO [Tab]
	SELECT
		SurveyTemplateId,
		'Dates',
		2
	FROM SurveyTemplate;

INSERT INTO [Tab]
	SELECT
		SurveyTemplateId,
		'Other',
		3
	FROM SurveyTemplate;