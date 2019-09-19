CREATE TABLE SurveyTemplate (
	[SurveyTemplateId] INT IDENTITY,
	[FunctionId] INT,
	[Version] INT
	PRIMARY KEY([SurveyTemplateId]),
	CONSTRAINT FK_SurveyTemplate_Function FOREIGN KEY ([FunctionId]) REFERENCES [Function]([FunctionId])
);

-- Create a version 1 for each case
INSERT INTO SurveyTemplate 
	SELECT
		FunctionId,
		1
	FROM [Function];
GO

-- Each template will have X amount of tabs
CREATE TABLE [Tab] (
	[TabId] INT IDENTITY,
	[SurveyTemplateId] INT,
	[TabName] NVARCHAR(50),
	[TabOrder] INT,
	PRIMARY KEY(TabId),
	CONSTRAINT FK_Tab_SurveyTemplate FOREIGN KEY ([SurveyTemplateId]) REFERENCES [SurveyTemplate]([SurveyTemplateId]),
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

-- Each tab will have multiple questions
CREATE Table [Question] (
	[QuestionId] INT IDENTITY,
	[TabId] INT,
	[QuestionMainText] NVARCHAR(MAX),
	[QuestionSubText] NVARCHAR(MAX),
	[QuestionOrder] INT,
	[SurveyMetricMetadataId] INT,
	PRIMARY KEY([QuestionId]),
	CONSTRAINT FK_Question_Tab FOREIGN KEY ([TabId]) REFERENCES [Tab]([TabId]),
	CONSTRAINT UK_QuestionOrder_Tab UNIQUE([QuestionOrder], [TabId]),
	CONSTRAINT FK_Question_SurveyMetricMetadataId FOREIGN KEY ([SurveyMetricMetadataId]) REFERENCES [SurveyMetricMetadata]([SurveyMetricMetadataId])
);

INSERT INTO [Question] VALUES
	((SELECT TabId FROM [Tab] WHERE TabName = 'Numerics'),
	'What is the revenue?',
	NULL,
	1,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Revenue')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Numerics'),
	'What is the FTE?',
	'Please don''t include part time employees',
	2,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Full time employees')
	),
	-- Date
	((SELECT TabId FROM [Tab] WHERE TabName = 'Dates'),
	'What is the start date?',
	NULL,
	1,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Start Date')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Dates'),
	'What is the end date?',
	NULL,
	2,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'End Date')
	),
	-- Other
	((SELECT TabId FROM [Tab] WHERE TabName = 'Other'),
	'Is the company privately held?',
	NULL,
	1,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Is Private')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Other'),
	'What is the company''s name?',
	NULL,
	2,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Company Name')
	);