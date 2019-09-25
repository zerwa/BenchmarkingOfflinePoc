INSERT INTO [Function] VALUES
	('SUPPORT', 'Support Functions');

-- Insert test Cases
INSERT INTO [Case]
VALUES 
	('Test Case 5', 'N1JH', (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'));

INSERT INTO SystemMetric VALUES
	('PTE','Part time employees', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER')),
	('COMMENTS','Additional Comments', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'TEXT'));

INSERT INTO SurveyMetricMetadata VALUES 
	('Part time employees', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'NUMBER'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'PTE')),
	('Additional Comments', (SELECT [MetricTypeId] FROM MetricType WHERE MetricTypeName = 'TEXT'), (SELECT SystemMetricId FROM SystemMetric WHERE [SystemMetricName] = 'COMMENTS'));

INSERT INTO SurveyTemplate
VALUES 
	((SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'), 1);
GO

INSERT INTO [Tab]
VALUES 
	((SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT')),'Numerics',1),
	((SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT')),'Other',2);
GO

INSERT INTO [Question] VALUES
	((SELECT TabId FROM [Tab] WHERE TabName = 'Numerics' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'What is the revenue?',
	NULL,
	1,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Revenue')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Numerics' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'What is the FTE?',
	'Please don''t include part time employees',
	2,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Full time employees')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Numerics' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'How many part time employees?',
	NULL,
	3,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Part time employees')
	),
	-- Other
	((SELECT TabId FROM [Tab] WHERE TabName = 'Other' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'Is the company privately held?',
	NULL,
	1,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Is Private')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Other' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'What is the company''s name?',
	NULL,
	2,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Company Name')
	),
	((SELECT TabId FROM [Tab] WHERE TabName = 'Other' AND SurveyTemplateId = (SELECT SurveyTemplateId FROM SurveyTemplate WHERE FunctionId = (SELECT FunctionId FROM [Function] WHERE FunctionName = 'SUPPORT'))),
	'Additional Comments',
	NULL,
	3,
	(SELECT SurveyMetricMetadataId FROM SurveyMetricMetadata WHERE SurveyMetricName = 'Additional Comments')
	)
	;