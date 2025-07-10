## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx`

1. **프롬프트 입력 섹션**
   - **UI 구성**: 
     - 화면 상단에 메인 페이지에서 전달받은 프롬프트를 표시하는 텍스트 필드
     - ShadCN의 `Input` 컴포넌트를 사용하여 편집 가능한 상태로 표시
     - 프롬프트 입력 필드 아래에 프롬프트 작성 가이드라인 텍스트 추가
   - **상호작용**: 
     - 사용자가 프롬프트를 자유롭게 수정 가능
     - 입력된 프롬프트는 실시간으로 유효성 검사
   - **오류 처리**: 
     - 프롬프트가 비어있을 경우 "프롬프트를 입력해 주세요" 메시지 표시
     - 최대 글자수(500자) 초과 시 알림 메시지 표시

2. **스타일 옵션 선택 섹션**
   - **UI 구성**:
     - 프롬프트 입력 필드 아래에 스타일 옵션 그룹 배치
     - ShadCN의 `Select` 컴포넌트를 사용한 드롭다운 메뉴
     - 각 옵션별 슬라이더와 토글 버튼
   - **스타일 옵션 항목**:
     - 색감 선택 (따뜻한/차가운/모노톤)
     - 텍스처 강도 조절 (슬라이더: 0-100%)
     - 분위기 선택 (밝은/어두운/중립적)
     - 스타일 프리셋 (사실적/추상적/만화적)
   - **상호작용**:
     - 각 옵션 변경 시 실시간으로 상태 업데이트
     - 프리셋 선택 시 관련 옵션들 자동 조정

3. **이미지 생성 섹션**
   - **UI 구성**:
     - 스타일 옵션 아래에 '이미지 생성' 버튼 배치
     - ShadCN의 `Button` 컴포넌트 사용
     - 생성 중 로딩 상태를 표시할 애니메이션 영역
   - **상호작용**:
     - 버튼 클릭 시 이미지 생성 API 호출
     - 생성 중에는 버튼 비활성화 및 로딩 애니메이션 표시
   - **오류 처리**:
     - API 호출 실패 시 오류 메시지 표시
     - 재시도 버튼 제공

4. **생성된 이미지 결과 섹션**
   - **UI 구성**:
     - 생성된 이미지를 큰 크기로 중앙에 표시
     - 이미지 아래에 액션 버튼 그룹 배치
       - 갤러리 저장 버튼
       - 커뮤니티 공유 버튼
       - 다시 생성 버튼
   - **상호작용**:
     - 이미지 클릭 시 원본 크기로 확대 보기
     - 갤러리 저장 시 성공/실패 알림 표시
     - 커뮤니티 공유 선택 시 공유 모달 표시
     - 다시 생성 시 현재 설정된 옵션으로 새로운 이미지 생성

5. **커뮤니티 공유 모달**
   - **UI 구성**:
     - 모달 상단에 제목 입력 필드
     - 설명 텍스트 입력 영역
     - 태그 입력 필드
     - 공개 설정 토글
     - 게시 버튼
   - **상호작용**:
     - 필수 입력 필드 검증
     - 게시 버튼 클릭 시 커뮤니티에 이미지 공유
     - 모달 외부 클릭 또는 ESC 키로 닫기

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 수정 및 스타일 설정**
   - 메인 페이지에서 전달받은 프롬프트 확인 및 수정
   - 원하는 스타일 옵션 선택 및 조정
   
2. **이미지 생성 프로세스**
   - 이미지 생성 버튼 클릭
   - 로딩 상태 표시 (약 10-30초 소요)
   - 생성 완료 또는 오류 상태 표시

3. **생성된 이미지 관리**
   - 결과 이미지 확인
   - 갤러리 저장 또는 커뮤니티 공유 선택
   - 필요시 같은 설정으로 다시 생성

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API

- **파일 위치**: `app/api/generate/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  prompt: string;
  styleOptions: {
    colorTone: 'warm' | 'cool' | 'monochrome';
    textureStrength: number; // 0-100
    mood: 'bright' | 'dark' | 'neutral';
    stylePreset: 'realistic' | 'abstract' | 'cartoon';
  }
}
```
- **응답 데이터**:
```typescript
{
  success: boolean;
  imageUrl?: string;
  error?: string;
}
```

#### 2. 갤러리 저장 API

- **파일 위치**: `app/api/gallery/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  imageUrl: string;
  prompt: string;
  styleOptions: {
    colorTone: string;
    textureStrength: number;
    mood: string;
    stylePreset: string;
  }
}
```
- **응답 데이터**: `{ success: boolean, message: string }`

#### 3. 커뮤니티 공유 API

- **파일 위치**: `app/api/community/post/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  imageUrl: string;
  prompt: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  styleOptions: {
    colorTone: string;
    textureStrength: number;
    mood: string;
    stylePreset: string;
  }
}
```
- **응답 데이터**: `{ success: boolean, postId: string }`

#### 4. 데이터베이스 스키마

```typescript
// GeneratedImage 테이블
{
  id: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  styleOptions: {
    colorTone: string;
    textureStrength: number;
    mood: string;
    stylePreset: string;
  };
  createdAt: string;
  isShared: boolean;
}

// GalleryImage 테이블
{
  id: string;
  userId: string;
  generatedImageId: string;
  createdAt: string;
}

// CommunityPost 테이블 (이미지 공유 시)
{
  id: string;
  userId: string;
  generatedImageId: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}
``` 