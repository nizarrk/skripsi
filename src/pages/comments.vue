<template>
  <f7-page>
    <f7-navbar title="Komentar" back-link="Back"></f7-navbar>
        <f7-block>
          <f7-list media-list>
            <f7-list-item
              title="test12"
              after="6 hari yang lalu">
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" width="44" />
                <span style="font-size: 13px; color: #8e8e93;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                  mollit anim id est laborum :)
                </span>
            </f7-list-item>
          </f7-list>
        </f7-block>
    <f7-messagebar
      :placeholder="placeholder"
      ref="messagebar"
      :attachments-visible="attachmentsVisible"
      :sheet-visible="sheetVisible"
    >
      <f7-link
        icon-ios="f7:camera_fill"
        icon-aurora="f7:camera_fill"
        icon-md="material:camera_alt"
        slot="inner-start"
        @click="sheetVisible = !sheetVisible"
      ></f7-link>
      <f7-link
        icon-ios="f7:arrow_up_fill"
        icon-aurora="f7:arrow_up_fill"
        icon-md="material:send"
        slot="inner-end"
        @click="sendMessage"
      ></f7-link>
      <f7-messagebar-attachments>
        <f7-messagebar-attachment
          v-for="(image, index) in attachments"
          :key="index"
          :image="image"
          @attachment:delete="deleteAttachment(image)"
        ></f7-messagebar-attachment>
      </f7-messagebar-attachments>
      <f7-messagebar-sheet>
        <f7-messagebar-sheet-image
          v-for="(image, index) in images"
          :key="index"
          :image="image"
          :checked="attachments.indexOf(image) >= 0"
          @change="handleAttachment"
        ></f7-messagebar-sheet-image>
      </f7-messagebar-sheet>
    </f7-messagebar>
  </f7-page>
</template>

<script>
export default {}
</script>