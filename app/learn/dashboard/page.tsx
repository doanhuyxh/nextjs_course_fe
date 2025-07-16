"use client"

import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Card,
  Progress,
  Badge,
  Skeleton,
  Collapse,
  Row,
  Col,
  Statistic,
  Empty,
  Typography,
  Space,
  Divider,
  Spin,
} from "antd"
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  DownOutlined,
  UpOutlined,
  LoadingOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse

interface Course {
  id: string
  name: string
  image: string
  description: string
}

interface Lesson {
  id: string
  name: string
  image: string
}

interface CourseProgress {
  courseUser: {
    courseId: string
    progress: number
  }
  lessonUser: Array<{
    lessonId: string
    progress: number
  }>
  courseName?: string
  image?: string
  description?: string
}

export default function Dashboard() {
  const [courseName, setCourseName] = useState<Course[]>([])
  const [lessonName, setLessonName] = useState<Lesson[]>([])
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([])
  const [data, setData] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchData = async () => {
      try {
        const [courseRes, lessonRes, progressRes] = await Promise.all([
          axiosCustomerConfig.get("/course/get-course-name"),
          axiosCustomerConfig.get("/course/get-lesson-name"),
          axiosCustomerConfig.get("/course/get-course-progress"),
        ])

        const courses = courseRes.data.map((item: any) => ({
          ...item,
          id: item.id.toLowerCase(),
        }))

        const lessons = lessonRes.data.map((item: any) => ({
          ...item,
          id: item.id.toLowerCase(),
        }))

        setCourseName(courses)
        setLessonName(lessons)
        setCourseProgress(progressRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mounted])

  useEffect(() => {
    if (courseName.length > 0 && courseProgress.length > 0) {
      const enrichedData = courseProgress.map((item: CourseProgress) => {
        const course = courseName.find((course: Course) => course.id === item.courseUser.courseId)
        return {
          ...item,
          courseName: course?.name,
          image: course?.image,
          description: course?.description,
        }
      })
      setData(enrichedData)
    }
  }, [courseName, lessonName, courseProgress])

  const getProgressStatus = (progress: number) => {
    if (progress === 100) return { text: "Hoàn thành", color: "success" as const }
    if (progress >= 80) return { text: "Sắp hoàn thành", color: "warning" as const }
    if (progress >= 50) return { text: "Đang học", color: "processing" as const }
    return { text: "Vừa bắt đầu", color: "default" as const }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#52c41a"
    if (progress >= 50) return "#faad14"
    return "#1890ff"
  }

  // Client-side hydration loading
  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />} size="large" />
        <Text style={{ marginTop: 16, fontSize: "16px", color: "#8c8c8c" }}>Đang khởi tạo ứng dụng...</Text>
      </div>
    )
  }

  // Data loading state
  if (loading) {
    return (
      <div style={{ padding: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Skeleton.Input active size="large" style={{ width: 300, height: 60, marginBottom: 16 }} />
          <Skeleton.Input active style={{ width: 400, height: 24 }} />
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {[...Array(3)].map((_, i) => (
            <Col xs={24} sm={8} key={i}>
              <Card>
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {[...Array(6)].map((_, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card>
                <Skeleton.Image style={{ width: "100%", height: 200 }} />
                <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 16 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  const statsData = [
    {
      title: "Tổng khóa học",
      value: data.length,
      icon: <BookOutlined style={{ color: "#1890ff" }} />,
    },
    {
      title: "Đang học",
      value: data.filter((item) => item.courseUser.progress > 0 && item.courseUser.progress < 100).length,
      icon: <ClockCircleOutlined style={{ color: "#faad14" }} />,
    },
    {
      title: "Hoàn thành",
      value: data.filter((item) => item.courseUser.progress === 100).length,
      icon: <TrophyOutlined style={{ color: "#52c41a" }} />,
    },
  ]

  return (
    <div style={{ padding: "32px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <Space direction="vertical" size="large">
          <Paragraph style={{ fontSize: "18px", color: "#000", maxWidth: "600px", margin: "0 auto" }}>
            Theo dõi tiến độ học tập và quản lý các khóa học của bạn
          </Paragraph>
        </Space>
      </div>

      {/* Stats Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card hoverable className="shadow-lg">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ fontSize: "32px", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Course Progress Section */}
      <Card
        className="border-none min-h-[100vh]"
        title={
          <Space>
            <BookOutlined />
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>Tiến độ học tập</span>
          </Space>
        }
        style={{ marginBottom: "32px" }}
      >
        {data.length === 0 ? (
          <Empty
            image={<BookOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />}
            description={
              <Space direction="vertical">
                <Text strong style={{ fontSize: "18px" }}>
                  Chưa có khóa học nào
                </Text>
                <Text type="secondary">Hãy đăng ký khóa học đầu tiên của bạn!</Text>
              </Space>
            }
          />
        ) : (
          <Row gutter={[24, 24]}>
            {data.map((item, index) => {
              const status = getProgressStatus(item.courseUser.progress)
              return (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card
                    className="p-2 shadow-lg"
                    hoverable
                    cover={
                      item?.image && (
                        <div className="relative w-full h-[200px] overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.courseName || "Course"}
                            fill
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                          {/* Optional: hiển thị Badge đè lên ảnh */}
                          <div className="absolute top-2 left-2 z-10">
                            <Badge status={status.color} text={status.text} className="font-bold bg-green-500 opacity-90 px-2 py-1 rounded" />
                          </div>
                        </div>
                      )
                    }
                    actions={[
                      <Collapse
                        key="lessons"
                        ghost
                        className="cursor-pointer"
                        expandIcon={({ isActive }) => (isActive ? <UpOutlined size={2} width={2} className="font-weight-bold cursor-pointer" /> : <DownOutlined size={2} width={2} className="font-weight-bold cursor-pointer" />)}
                      >
                        <Panel
                          header={
                            <Space>
                              <BookOutlined />
                              <span>Bài học ({item.lessonUser.length})</span>
                            </Space>
                          }
                          key="1"
                        >
                          {item.lessonUser.length === 0 ? (
                            <Empty
                              image={<BookOutlined style={{ fontSize: "32px", color: "#d9d9d9" }} />}
                              description="Chưa có bài học nào"
                              style={{ padding: "24px 0" }}
                            />
                          ) : (
                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                {item.lessonUser.map((lesson, lessonIndex) => {
                                  const lessonData = lessonName.find((l) => l.id === lesson.lessonId)

                                  return (
                                    <Card key={lessonIndex} size="small" style={{ backgroundColor: "#fafafa" }}>
                                      <Row align="middle" gutter={12}>
                                        {lessonData?.image && (
                                          <Col flex="none">
                                            <div
                                              style={{
                                                width: "100px",
                                                height: "60px",
                                                position: "relative",
                                                borderRadius: "2px",
                                                overflow: "hidden",
                                              }}
                                            >
                                              <Image
                                                src={lessonData.image || "/placeholder.svg"}
                                                alt={lessonData.name || "Lesson"}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                loading="lazy"
                                              />
                                            </div>
                                          </Col>
                                        )}
                                        <Col flex="auto">
                                          <div>
                                            <Text strong style={{ fontSize: "14px" }}>
                                              {lessonData?.name}
                                            </Text>
                                            <div style={{ marginTop: "4px" }}>
                                              <Progress
                                                percent={lesson.progress}
                                                size="small"
                                                strokeColor={getProgressColor(lesson.progress)}
                                                format={(percent) => `${percent}%`}
                                              />
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Card>
                                  )
                                })}
                              </Space>
                            </div>
                          )}
                        </Panel>
                      </Collapse>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Text strong style={{ fontSize: "18px" }}>
                          {item.courseName}
                        </Text>
                      }
                      description={
                        item.description && (
                          <Paragraph ellipsis={{ rows: 2 }} style={{ color: "#8c8c8c", marginBottom: "16px" }}>
                            {item.description}
                          </Paragraph>
                        )
                      }
                    />

                    <Divider style={{ margin: "16px 0" }} />

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Text strong>Tiến độ khóa học</Text>
                        <Text strong style={{ color: getProgressColor(item.courseUser.progress) }}>
                          {item.courseUser.progress}%
                        </Text>
                      </div>
                      <Progress
                        percent={item.courseUser.progress}
                        strokeColor={getProgressColor(item.courseUser.progress)}
                        trailColor="#f0f0f0"
                        size={8}
                        showInfo={false}
                      />
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        )}
      </Card>
    </div>
  )
}
