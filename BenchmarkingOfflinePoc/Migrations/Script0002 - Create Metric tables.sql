CREATE TABLE MetricType (
	MetricTypeId INT IDENTITY,
	MetricTypeName NVARCHAR(50),
	PRIMARY KEY ([MetricTypeId])
);

INSERT INTO MetricType VALUES
('DATE'),
('NUMBER'),
('TEXT'),
('CHECKBOX');

CREATE TABLE SystemMetric (
	[SystemMetricId] INT IDENTITY,
	[SystemMetricName] NVARCHAR(50),
	[SystemMetricDisplayName] NVARCHAR(50),
	[MetricTypeId] INT,
	PRIMARY KEY ([SystemMetricId]),
	CONSTRAINT FK_SystemMetric_MetricType FOREIGN KEY ([MetricTypeId]) REFERENCES MetricType ([MetricTypeId])
);

INSERT INTO SystemMetric VALUES
	('REVENUE','Revenue', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER')),
	('FTE','Full time employees', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER')),
	('START_DATE','Start Date', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'DATE')),
	('END_DATE','End Date', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'DATE')),
	('IS_PRIVATE','Is Private', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'CHECKBOX')),
	('COMPANY_NAME','Company Name', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'TEXT'));

CREATE TABLE SurveyMetricMetadata (
	[SurveyMetricMetadataId] INT IDENTITY,
	[SurveyMetricName] NVARCHAR(50),
	[MetricTypeId] INT,
	[SystemMetricId] INT,
	PRIMARY KEY ([SurveyMetricMetadataId]),
	CONSTRAINT FK_SurveyMetricMetadata_MetricType FOREIGN KEY ([MetricTypeId]) REFERENCES MetricType ([MetricTypeId]),
	CONSTRAINT FK_SurveyMetricMetadata_SystemMetric FOREIGN KEY ([SystemMetricId]) REFERENCES SystemMetric ([SystemMetricId])
);

INSERT INTO SurveyMetricMetadata VALUES 
	('Revenue', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'REVENUE')),
	('Full time employees', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'FTE')),
	('Start Date', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'DATE'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'START_DATE')),
	('End Date', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'DATE'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'END_DATE')),
	('Is Private', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'CHECKBOX'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'IS_PRIVATE')),
	('Company Name', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'TEXT'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'COMPANY_NAME'));

CREATE TABLE SurveyMetric (
	[SurveyMetricId] INT IDENTITY,
	[SurveyMetricMetadataId] INT,
	[CaseId] INT,
	[NumberValue] FLOAT,
	[DateValue] DATETIME,
	[BooleanValue] BIT,
	[TEXT_VALUE] NVARCHAR(MAX)
	PRIMARY KEY ([SurveyMetricId]),
	CONSTRAINT FK_SurveyMetric_SurveyMetricMetadata FOREIGN KEY ([SurveyMetricMetadataId]) REFERENCES SurveyMetricMetadata ([SurveyMetricMetadataId]),
	CONSTRAINT FK_SurveyMetric_Case FOREIGN KEY ([CaseId]) REFERENCES [Case] ([CaseId])
);
