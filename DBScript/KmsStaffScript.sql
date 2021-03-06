USE [KmsStaffPlan]
GO
/****** Object:  Table [dbo].[CompetentLevel]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompetentLevel](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
 CONSTRAINT [PK_CompetentLevel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Department]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Employee]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](100) NULL,
	[TitleId] [uniqueidentifier] NULL,
	[Photo] [nvarchar](max) NULL,
	[Email] [nvarchar](500) NULL,
	[Phone] [nvarchar](500) NULL,
	[Address] [nvarchar](max) NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EmployeeSkill]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeSkill](
	[Id] [uniqueidentifier] NOT NULL,
	[EmployeeId] [int] NULL,
	[IsPrimary] [bit] NULL,
	[SkillId] [uniqueidentifier] NULL,
	[ExperienceId] [uniqueidentifier] NULL,
	[CompetentLevelId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_EmployeeSkill] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Experience]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experience](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
 CONSTRAINT [PK_Experience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Project]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Client] [nvarchar](500) NULL,
	[Photo] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[TeamSize] [int] NULL,
	[DepartmentId] [uniqueidentifier] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectStaff]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectStaff](
	[Id] [uniqueidentifier] NOT NULL,
	[ProjectId] [uniqueidentifier] NULL,
	[EmployeeId] [int] NULL,
	[Status] [int] NULL,
	[PositionId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_ProjectStaff] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectStaffPosition]    Script Date: 1/4/2019 2:17:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectStaffPosition](
	[Id] [uniqueidentifier] NOT NULL,
	[PositionName] [nvarchar](max) NULL,
	[PositionShortName] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProjectStaffPosition] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[ProjectStaff]  WITH CHECK ADD  CONSTRAINT [FK_ProjectStaff_ProjectStaffPosition] FOREIGN KEY([PositionId])
REFERENCES [dbo].[ProjectStaffPosition] ([Id])
GO
ALTER TABLE [dbo].[ProjectStaff] CHECK CONSTRAINT [FK_ProjectStaff_ProjectStaffPosition]
GO

GO
/****** Object:  Table [dbo].[Request]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[Id] [uniqueidentifier] NOT NULL,
	[Type] [int] NULL,
	[Number] [int] NULL,
	[SessionPlanId] [uniqueidentifier] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Request] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RequestDetail]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestDetail](
	[Id] [uniqueidentifier] NOT NULL,
	[TitleId] [uniqueidentifier] NULL,
	[SkillId] [uniqueidentifier] NULL,
	[CompetentLevelId] [uniqueidentifier] NULL,
	[RequestId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RequestDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SessionPlan]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SessionPlan](
	[Id] [uniqueidentifier] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[ProjectId] [uniqueidentifier] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_SessionPlan] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Skill]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Skill](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
	[CategoryId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Skill] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SkillCategory]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SkillCategory](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
 CONSTRAINT [PK_SkillCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StaffPlan]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StaffPlan](
	[Id] [uniqueidentifier] NOT NULL,
	[RequestId] [uniqueidentifier] NULL,
	[EmployeeId] [int] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_StaffPlan] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Title]    Script Date: 12/13/2018 7:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Title](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Level] [int] NULL,
 CONSTRAINT [PK_Title] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Title] FOREIGN KEY([TitleId])
REFERENCES [dbo].[Title] ([Id])
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Title]
GO
ALTER TABLE [dbo].[EmployeeSkill]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeSkill_CompetentLevel] FOREIGN KEY([CompetentLevelId])
REFERENCES [dbo].[CompetentLevel] ([Id])
GO
ALTER TABLE [dbo].[EmployeeSkill] CHECK CONSTRAINT [FK_EmployeeSkill_CompetentLevel]
GO
ALTER TABLE [dbo].[EmployeeSkill]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeSkill_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
GO
ALTER TABLE [dbo].[EmployeeSkill] CHECK CONSTRAINT [FK_EmployeeSkill_Employee]
GO
ALTER TABLE [dbo].[EmployeeSkill]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeSkill_Experience2] FOREIGN KEY([ExperienceId])
REFERENCES [dbo].[Experience] ([Id])
GO
ALTER TABLE [dbo].[EmployeeSkill] CHECK CONSTRAINT [FK_EmployeeSkill_Experience2]
GO
ALTER TABLE [dbo].[EmployeeSkill]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeSkill_Skill] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skill] ([Id])
GO
ALTER TABLE [dbo].[EmployeeSkill] CHECK CONSTRAINT [FK_EmployeeSkill_Skill]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_Department] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Department] ([Id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_Department]
GO
ALTER TABLE [dbo].[ProjectStaff]  WITH CHECK ADD  CONSTRAINT [FK_ProjectStaff_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
GO
ALTER TABLE [dbo].[ProjectStaff] CHECK CONSTRAINT [FK_ProjectStaff_Employee]
GO
ALTER TABLE [dbo].[ProjectStaff]  WITH CHECK ADD  CONSTRAINT [FK_ProjectStaff_Project] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Project] ([Id])
GO
ALTER TABLE [dbo].[ProjectStaff] CHECK CONSTRAINT [FK_ProjectStaff_Project]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FK_Request_SessionPlan] FOREIGN KEY([SessionPlanId])
REFERENCES [dbo].[SessionPlan] ([Id])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FK_Request_SessionPlan]
GO
ALTER TABLE [dbo].[RequestDetail]  WITH CHECK ADD  CONSTRAINT [FK_RequestDetail_CompetentLevel] FOREIGN KEY([CompetentLevelId])
REFERENCES [dbo].[CompetentLevel] ([Id])
GO
ALTER TABLE [dbo].[RequestDetail] CHECK CONSTRAINT [FK_RequestDetail_CompetentLevel]
GO
ALTER TABLE [dbo].[RequestDetail]  WITH CHECK ADD  CONSTRAINT [FK_RequestDetail_Request] FOREIGN KEY([RequestId])
REFERENCES [dbo].[Request] ([Id])
GO
ALTER TABLE [dbo].[RequestDetail] CHECK CONSTRAINT [FK_RequestDetail_Request]
GO
ALTER TABLE [dbo].[RequestDetail]  WITH CHECK ADD  CONSTRAINT [FK_RequestDetail_Skill1] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skill] ([Id])
GO
ALTER TABLE [dbo].[RequestDetail] CHECK CONSTRAINT [FK_RequestDetail_Skill1]
GO
ALTER TABLE [dbo].[RequestDetail]  WITH CHECK ADD  CONSTRAINT [FK_RequestDetail_Title1] FOREIGN KEY([TitleId])
REFERENCES [dbo].[Title] ([Id])
GO
ALTER TABLE [dbo].[RequestDetail] CHECK CONSTRAINT [FK_RequestDetail_Title1]
GO
ALTER TABLE [dbo].[SessionPlan]  WITH CHECK ADD  CONSTRAINT [FK_SessionPlan_Project] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Project] ([Id])
GO
ALTER TABLE [dbo].[SessionPlan] CHECK CONSTRAINT [FK_SessionPlan_Project]
GO
ALTER TABLE [dbo].[Skill]  WITH CHECK ADD  CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[SkillCategory] ([Id])
GO
ALTER TABLE [dbo].[Skill] CHECK CONSTRAINT [FK_Skill_SkillCategory]
GO
ALTER TABLE [dbo].[StaffPlan]  WITH CHECK ADD  CONSTRAINT [FK_StaffPlan_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
GO
ALTER TABLE [dbo].[StaffPlan] CHECK CONSTRAINT [FK_StaffPlan_Employee]
GO
ALTER TABLE [dbo].[StaffPlan]  WITH CHECK ADD  CONSTRAINT [FK_StaffPlan_Request] FOREIGN KEY([RequestId])
REFERENCES [dbo].[Request] ([Id])
GO
ALTER TABLE [dbo].[StaffPlan] CHECK CONSTRAINT [FK_StaffPlan_Request]
GO

-- CREATE TEST PROC
CREATE proc [dbo].[usp_SP1]
@p1 int
AS
SELECT * FROM Project